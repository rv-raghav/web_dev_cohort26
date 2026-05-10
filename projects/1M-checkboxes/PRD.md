# 一百万个复选框 (1 Million Checkboxes)
## Product Requirements Document — Full Stack Real-Time Application

> **Theme:** Japanese-aesthetic, ink-on-paper minimalism with subtle wabi-sabi elements  
> **Stack:** Node.js · Express · WebSockets · Redis · OIDC/OAuth 2.0 · Vanilla JS frontend  
> **Architecture:** MVC · JWT with rotation · Redis Pub/Sub · Bitfield state storage

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Directory Structure](#3-directory-structure)
4. [Database & State Design](#4-database--state-design)
5. [Authentication System (OIDC / OAuth 2.0)](#5-authentication-system-oidc--oauth-20)
6. [Rate Limiting System](#6-rate-limiting-system)
7. [WebSocket Layer](#7-websocket-layer)
8. [Redis Pub/Sub Strategy](#8-redis-pubsub-strategy)
9. [REST API Specification](#9-rest-api-specification)
10. [Frontend Specification](#10-frontend-specification)
11. [Task Breakdown for IDE Agent](#11-task-breakdown-for-ide-agent)
12. [Environment Variables](#12-environment-variables)
13. [README Template](#13-readme-template)

---

## 1. Project Overview

### 1.1 What We Are Building

A real-time collaborative web application where **1,000,000 checkboxes** are displayed in a grid. Any authenticated user can toggle any checkbox. Every toggle is immediately broadcast to all connected users via WebSockets. Anonymous users can **view** the grid but **cannot toggle** — they are prompted to log in when they click.

### 1.2 Core Principles

| Principle | Implementation |
|-----------|---------------|
| **Real-time** | WebSocket broadcast via Redis Pub/Sub |
| **Scalable state** | Redis Bitfield (1M bits = ~125 KB) |
| **Secure auth** | OIDC Authorization Code Flow + PKCE, HTTP-only cookies |
| **Abuse prevention** | Custom Redis-backed rate limiting (no external packages) |
| **Clean architecture** | MVC, no business logic in routes or controllers |
| **Production auth** | Access token (15 min) + Refresh token rotation (7 days), stored in HTTP-only cookies |

### 1.3 User Roles

| Role | Can View | Can Toggle | Rate Limited |
|------|----------|------------|-------------|
| Anonymous | ✅ | ❌ (prompt to login) | Read-only |
| Authenticated | ✅ | ✅ | Yes — 10 toggles/sec |
| Admin (future) | ✅ | ✅ | Higher limit |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Vanilla JS SPA  │  WebSocket Client  │  HTTP Fetch API  │    │
│  └──────────┬───────────────────┬──────────────────┬────────┘    │
└─────────────┼───────────────────┼──────────────────┼────────────┘
              │ HTTP(S)           │ WSS              │ HTTP(S)
┌─────────────▼───────────────────▼──────────────────▼────────────┐
│                        NGINX / LOAD BALANCER                      │
└─────────────┬───────────────────────────────────────────────────┘
              │
    ┌─────────▼─────────┐     ┌──────────────────────┐
    │   Node.js Server   │     │   Auth Server (OIDC)  │
    │   (Express + WS)   │     │   (same process or    │
    │                    │     │    separate service)   │
    │  ┌──────────────┐  │     └──────────────────────┘
    │  │  HTTP Routes │  │
    │  │  WS Handler  │  │
    │  │  Auth Middle │  │
    │  │  Rate Limiter│  │
    │  └──────┬───────┘  │
    └─────────┼──────────┘
              │
    ┌─────────▼──────────────────────────────────┐
    │                  REDIS                      │
    │  ┌─────────────┐  ┌──────────────────────┐ │
    │  │  Bitfield   │  │  Pub/Sub Channels    │ │
    │  │  (1M bits)  │  │  checkbox:updates    │ │
    │  └─────────────┘  └──────────────────────┘ │
    │  ┌─────────────┐  ┌──────────────────────┐ │
    │  │  Rate Limit │  │  Refresh Tokens      │ │
    │  │  Counters   │  │  (hashed, TTL)       │ │
    │  └─────────────┘  └──────────────────────┘ │
    └────────────────────────────────────────────┘
```

### 2.1 Request Lifecycle — Checkbox Toggle

```
User clicks checkbox
        │
        ▼
WS sends { type: "toggle", index: N, token: (cookie auto-sent) }
        │
        ▼
Server: validateJWT(accessToken from cookie)
        │ invalid → send error "AUTH_REQUIRED"
        │ valid ↓
        ▼
RateLimiter.check(userId, window=1s, max=10)
        │ exceeded → send error "RATE_LIMITED"
        │ ok ↓
        ▼
Redis: BITFIELD checkboxes SET u1 {index} {newBit}
        │
        ▼
Redis PUBLISH "checkbox:updates" { index, value, userId }
        │
        ▼
All server instances receive → broadcast to their WS clients
        │
        ▼
Frontend updates checkbox[N].checked = newBit
```

---

## 3. Directory Structure

```
million-checkboxes/
├── src/
│   ├── server/                        # Main app server
│   │   ├── app.js                     # Express app factory
│   │   ├── index.js                   # Entry point, HTTP + WS server
│   │   ├── config/
│   │   │   ├── index.js               # Centralised config from env
│   │   │   └── redis.js               # Redis client factory
│   │   ├── models/
│   │   │   ├── CheckboxModel.js       # Redis bitfield read/write
│   │   │   ├── TokenModel.js          # Refresh token store in Redis
│   │   │   └── RateLimitModel.js      # Rate limit counters in Redis
│   │   ├── controllers/
│   │   │   ├── checkboxController.js  # HTTP get-state endpoint
│   │   │   └── authController.js      # Login, callback, refresh, logout
│   │   ├── services/
│   │   │   ├── checkboxService.js     # Toggle logic, pub/sub publish
│   │   │   ├── authService.js         # JWT sign/verify, PKCE, OIDC flow
│   │   │   └── rateLimitService.js    # Rate limit logic
│   │   ├── middleware/
│   │   │   ├── authenticate.js        # JWT cookie validation middleware
│   │   │   ├── rateLimitHttp.js       # HTTP rate limit middleware
│   │   │   └── errorHandler.js        # Global error handler
│   │   ├── routes/
│   │   │   ├── index.js               # Route aggregator
│   │   │   ├── auth.routes.js         # /auth/* routes
│   │   │   └── checkbox.routes.js     # /api/checkboxes routes
│   │   └── websocket/
│   │       ├── wsServer.js            # WS server setup, upgrade handler
│   │       ├── wsHandler.js           # Per-connection message handling
│   │       └── pubsub.js              # Redis subscriber, fan-out to clients
│   └── auth-server/                   # OIDC Provider (can be same process)
│       ├── index.js
│       ├── config/
│       │   └── oidcConfig.js          # OIDC provider config (clients, grants)
│       ├── models/
│       │   └── UserModel.js           # User store (Redis hash or Postgres)
│       ├── controllers/
│       │   └── oidcController.js      # Authorize, token, userinfo endpoints
│       ├── services/
│       │   └── oidcService.js         # PKCE verify, code exchange logic
│       └── routes/
│           └── oidc.routes.js
├── public/                            # Static frontend assets
│   ├── index.html
│   ├── login.html
│   ├── css/
│   │   ├── main.css                   # Japanese-themed styles
│   │   ├── grid.css                   # Checkbox grid layout
│   │   └── animations.css             # Ink-drop animations
│   └── js/
│       ├── app.js                     # Main entry, initialise everything
│       ├── grid.js                    # Virtual scroll, checkbox render
│       ├── ws.js                      # WebSocket client, reconnect logic
│       ├── auth.js                    # Auth state, redirect to login
│       └── api.js                     # Fetch helpers
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

---

## 4. Database & State Design

### 4.1 Checkbox State — Redis Bitfield

**Key:** `checkboxes`  
**Structure:** A single Redis string used as a bitfield. 1 million bits = exactly 125,000 bytes (122 KB).

```
BITFIELD checkboxes SET u1 {index} {0|1}    → toggle a single bit
BITFIELD checkboxes GET u1 {index}           → read one bit
GETRANGE checkboxes 0 -1                     → read entire state as binary blob (for init load)
```

**Why Bitfield?**
- 1 million separate Redis keys = ~50 MB overhead
- 1 bitfield = 125 KB, single O(1) read for full state
- Atomic single-bit set/get, no race conditions

### 4.2 Refresh Token Store

**Key pattern:** `rt:{hashedToken}`  
**Value (Redis Hash):**
```
userId        → string
familyId      → string (UUID per login session)
issuedAt      → unix timestamp
expiresAt     → unix timestamp
userAgent     → string
ip            → string
```
**TTL:** 7 days (auto-expire)

**Rotation Rules:**
- On every refresh: delete old token, issue new one with same familyId
- If old token already consumed (reuse detected): revoke entire family → force logout

### 4.3 Rate Limit Counters

**Key pattern:** `rl:ws:{userId}:{windowTs}`  
**Value:** integer counter  
**TTL:** 2 seconds (sliding window bucket)

**Key pattern:** `rl:http:{ip}:{endpoint}:{windowTs}`  
**Value:** integer counter  
**TTL:** 60 seconds

### 4.4 User Store

**Key pattern:** `user:{userId}`  
**Value (Redis Hash):**
```
id            → UUID
email         → string
passwordHash  → bcrypt hash (for local provider)
displayName   → string
createdAt     → ISO string
```

---

## 5. Authentication System (OIDC / OAuth 2.0)

### 5.1 Overview

The application implements its **own OIDC Authorization Server** (not a third-party). This is a production-level implementation with:

- Authorization Code Flow + PKCE (RFC 7636)
- HTTP-only, Secure, SameSite=Strict cookies (no localStorage)
- Access Token: signed JWT, 15-minute expiry
- Refresh Token: opaque random token, stored hashed in Redis, 7-day expiry with rotation
- Token family tracking to detect refresh token reuse attacks
- CSRF protection on all state-mutating endpoints

### 5.2 OIDC Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/authorize` | GET | Start OIDC flow, redirect to login page |
| `/auth/login` | POST | Submit credentials, issue auth code |
| `/auth/token` | POST | Exchange auth code for tokens |
| `/auth/refresh` | POST | Rotate refresh token, issue new access token |
| `/auth/logout` | POST | Revoke refresh token family, clear cookies |
| `/auth/userinfo` | GET | Return claims for current user (requires access token) |
| `/auth/jwks` | GET | Public JWKS endpoint for token verification |

### 5.3 Authorization Code Flow (Step by Step)

```
Step 1: Frontend sends GET /auth/authorize
        Query params: client_id, redirect_uri, response_type=code,
                      scope=openid profile, state={random}, code_challenge={SHA256(verifier)},
                      code_challenge_method=S256

Step 2: Server validates client_id, stores (state, code_challenge) in Redis (TTL 10 min)
        Redirects to /login.html with state in URL param

Step 3: User submits login form → POST /auth/login
        Body: { email, password, state }
        Server: verify credentials, verify state exists in Redis
        Issues auth code (random 32 bytes, hex), stores { code → userId, codeChallenge, clientId } in Redis (TTL 5 min)
        Redirects to redirect_uri?code={code}&state={state}

Step 4: Frontend sends POST /auth/token (from callback handler)
        Body: { code, code_verifier, client_id, redirect_uri, grant_type=authorization_code }
        Server: verify code exists, verify SHA256(code_verifier) === stored code_challenge
        Issues:
          - accessToken (JWT, 15 min, signed with RS256)
          - refreshToken (opaque, stored hashed in Redis, 7 days)
        Sets HTTP-only cookies:
          - access_token (15 min, Secure, SameSite=Strict)
          - refresh_token (7 days, Secure, SameSite=Strict, HttpOnly)

Step 5: All subsequent requests automatically include cookies
        Server middleware validates access_token cookie on each request
        If expired → 401, frontend calls POST /auth/refresh automatically
        If refresh succeeds → new cookies set, original request retried
        If refresh fails → user redirected to login
```

### 5.4 JWT Access Token Structure

```json
Header:
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-2024-01"
}

Payload:
{
  "sub": "user-uuid-here",
  "iss": "https://your-domain.com",
  "aud": "million-checkboxes",
  "exp": 1700000000,
  "iat": 1699999100,
  "email": "user@example.com",
  "displayName": "Tanaka",
  "scope": "openid profile"
}
```

- Signed with **RS256** (RSA 2048-bit private key)
- Public key exposed at `/auth/jwks` for verification
- `kid` header enables key rotation without downtime

### 5.5 Refresh Token Rotation & Reuse Detection

```javascript
// On POST /auth/refresh:

1. Read refresh_token cookie
2. Hash it: SHA256(token)
3. Lookup in Redis: GET rt:{hash}
4. If not found:
   - Check if token belongs to a revoked family
   - If yes → already-stolen token reuse detected → log security event
   - Return 401
5. If found:
   - Mark old token as consumed (DELETE rt:{hash})
   - Issue new refresh token
   - Store new token with same familyId
   - Set new cookie
6. Issue new access token
7. Return 200
```

### 5.6 WebSocket Authentication

WebSocket connections do **not** use query params for tokens (insecure — tokens appear in logs).

```
Client connects: new WebSocket('wss://domain/ws')
  → Cookies are automatically sent in the upgrade request
  → Server reads access_token cookie from upgrade headers
  → Validates JWT
  → If invalid: close connection with code 4001
  → If valid: store { ws, userId, displayName } in connected clients map
```

For token expiry during a WebSocket session:
- Client sends a periodic ping every 10 minutes
- Server responds with `{ type: "token_status", valid: true/false }`
- If invalid, client re-authenticates via `/auth/refresh` then reconnects

---

## 6. Rate Limiting System

> **No external packages.** All logic is custom, using Redis + time-window buckets.

### 6.1 WebSocket Rate Limiter (Per-User Toggle Rate)

**Algorithm:** Fixed window counter per 1-second bucket

```javascript
// RateLimitModel.js
async function checkWsRateLimit(userId) {
  const windowTs = Math.floor(Date.now() / 1000); // 1-second bucket
  const key = `rl:ws:${userId}:${windowTs}`;

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 2); // TTL slightly larger than window
  }

  const MAX = 10; // 10 toggles per second per user
  return {
    allowed: count <= MAX,
    remaining: Math.max(0, MAX - count),
    retryAfter: count > MAX ? 1 : 0,
  };
}
```

### 6.2 HTTP Rate Limiter (Per-IP, Per-Endpoint)

**Algorithm:** Sliding window using Redis sorted sets

```javascript
// For login endpoint: 5 attempts per 15 minutes per IP
async function checkHttpRateLimit(ip, endpoint, max, windowSeconds) {
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;
  const key = `rl:http:${ip}:${endpoint}`;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, '-inf', windowStart);   // remove old entries
  pipe.zadd(key, now, `${now}-${Math.random()}`);    // add current request
  pipe.zcard(key);                                    // count in window
  pipe.expire(key, windowSeconds);

  const results = await pipe.exec();
  const count = results[2][1];

  return {
    allowed: count <= max,
    remaining: Math.max(0, max - count),
    retryAfter: count > max ? windowSeconds : 0,
  };
}
```

### 6.3 Rate Limit Middleware (HTTP)

```javascript
// middleware/rateLimitHttp.js
function createRateLimiter(endpoint, max, windowSeconds) {
  return async (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    const result = await checkHttpRateLimit(ip, endpoint, max, windowSeconds);

    res.set('X-RateLimit-Limit', max);
    res.set('X-RateLimit-Remaining', result.remaining);

    if (!result.allowed) {
      res.set('Retry-After', result.retryAfter);
      return res.status(429).json({ error: 'RATE_LIMITED', retryAfter: result.retryAfter });
    }
    next();
  };
}
```

### 6.4 Rate Limit Thresholds

| Endpoint / Action | Limit | Window |
|-------------------|-------|--------|
| WS toggle (per user) | 10 | 1 second |
| POST /auth/login (per IP) | 5 | 15 minutes |
| POST /auth/refresh (per IP) | 20 | 1 minute |
| GET /api/checkboxes (per IP) | 30 | 1 minute |
| POST /auth/authorize (per IP) | 10 | 5 minutes |

---

## 7. WebSocket Layer

### 7.1 Server Setup

```javascript
// websocket/wsServer.js
// Use the 'ws' package (npm install ws)
// Attach to the same HTTP server as Express

const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ noServer: true });

httpServer.on('upgrade', (request, socket, head) => {
  // Validate JWT from cookie BEFORE upgrading
  const token = parseCookies(request.headers.cookie)['access_token'];
  const user = authService.verifyAccessToken(token); // null if invalid/expired

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request, user); // user may be null (anonymous)
  });
});
```

### 7.2 Client Registry

```javascript
// In-memory map on each server instance
// Map<socketId, { ws, userId, displayName, connectedAt, ip }>
const clients = new Map();

// On connection:
const socketId = crypto.randomUUID();
clients.set(socketId, { ws, userId: user?.sub ?? null, displayName: user?.displayName ?? 'Guest', connectedAt: Date.now() });

// On close:
clients.delete(socketId);
```

### 7.3 Message Protocol (Client → Server)

All messages are JSON strings.

```jsonc
// Toggle a checkbox
{ "type": "toggle", "index": 499999 }

// Ping (keep-alive + token check)
{ "type": "ping" }

// Request initial state chunk (for virtual scroll)
{ "type": "request_chunk", "byteStart": 0, "byteEnd": 4095 }
```

### 7.4 Message Protocol (Server → Client)

```jsonc
// Checkbox updated (broadcast to all)
{ "type": "checkbox_update", "index": 499999, "value": 1, "userId": "abc123" }

// Error
{ "type": "error", "code": "AUTH_REQUIRED", "message": "Please log in to toggle checkboxes" }
{ "type": "error", "code": "RATE_LIMITED", "message": "Too many toggles", "retryAfter": 1 }

// Pong
{ "type": "pong", "tokenValid": true, "connectedUsers": 42 }

// Chunk response
{ "type": "chunk", "byteStart": 0, "data": "<base64-encoded binary>" }

// Welcome
{ "type": "welcome", "socketId": "uuid", "connectedUsers": 42 }
```

### 7.5 WS Handler Logic

```javascript
// websocket/wsHandler.js
async function handleMessage(ws, socketId, user, rawMessage) {
  let msg;
  try { msg = JSON.parse(rawMessage); }
  catch { return ws.send(JSON.stringify({ type: 'error', code: 'INVALID_JSON' })); }

  switch (msg.type) {

    case 'toggle': {
      // 1. Auth check
      if (!user) {
        return ws.send(JSON.stringify({ type: 'error', code: 'AUTH_REQUIRED' }));
      }
      // 2. Validate index
      const index = parseInt(msg.index);
      if (isNaN(index) || index < 0 || index >= 1_000_000) {
        return ws.send(JSON.stringify({ type: 'error', code: 'INVALID_INDEX' }));
      }
      // 3. Rate limit
      const rl = await rateLimitService.checkWs(user.sub);
      if (!rl.allowed) {
        return ws.send(JSON.stringify({ type: 'error', code: 'RATE_LIMITED', retryAfter: rl.retryAfter }));
      }
      // 4. Toggle in Redis
      await checkboxService.toggle(index, user.sub);
      // (publish happens inside checkboxService.toggle via Redis PUBLISH)
      break;
    }

    case 'ping': {
      const tokenValid = !!user;
      const connectedUsers = clients.size;
      ws.send(JSON.stringify({ type: 'pong', tokenValid, connectedUsers }));
      break;
    }

    case 'request_chunk': {
      const chunk = await checkboxService.getChunk(msg.byteStart, msg.byteEnd);
      ws.send(JSON.stringify({ type: 'chunk', byteStart: msg.byteStart, data: chunk }));
      break;
    }
  }
}
```

---

## 8. Redis Pub/Sub Strategy

### 8.1 Why Pub/Sub?

If you run multiple Node.js server instances (horizontal scaling), each has its own in-memory `clients` Map. When User A (on Server 1) toggles a checkbox, Server 2's clients would never hear about it without Pub/Sub.

### 8.2 Implementation

```javascript
// websocket/pubsub.js

// Two separate Redis connections required:
// - publisher: used by checkboxService to PUBLISH
// - subscriber: used here to SUBSCRIBE and fan-out

const subscriber = createRedisClient();
await subscriber.subscribe('checkbox:updates');

subscriber.on('message', (channel, message) => {
  if (channel !== 'checkbox:updates') return;
  const update = JSON.parse(message);

  // Fan out to all WS clients connected to THIS server instance
  const payload = JSON.stringify({
    type: 'checkbox_update',
    index: update.index,
    value: update.value,
    userId: update.userId,
  });

  for (const [, client] of clients) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(payload);
    }
  }
});

// In checkboxService.toggle():
async function toggle(index, userId) {
  // Read current bit
  const [current] = await redis.bitfield('checkboxes', 'GET', 'u1', index);
  const newValue = current ? 0 : 1;
  // Set new bit
  await redis.bitfield('checkboxes', 'SET', 'u1', index, newValue);
  // Publish to all instances
  await publisher.publish('checkbox:updates', JSON.stringify({ index, value: newValue, userId }));
}
```

---

## 9. REST API Specification

### 9.1 Auth Routes

#### `GET /auth/authorize`
Initiates OIDC flow. Validates `client_id`, `redirect_uri`, `code_challenge`. Stores state. Redirects to `/login.html?state=...`

#### `POST /auth/login`
```json
Request Body:
{ "email": "user@example.com", "password": "hunter2", "state": "abc123" }

Response (302):
Location: {redirect_uri}?code={authCode}&state={state}
```

#### `POST /auth/token`
```json
Request Body:
{
  "grant_type": "authorization_code",
  "code": "...",
  "code_verifier": "...",
  "client_id": "million-checkboxes",
  "redirect_uri": "https://..."
}

Response (200):
Sets cookies: access_token (15min), refresh_token (7d)
Body: { "token_type": "Bearer", "expires_in": 900, "scope": "openid profile" }
```

#### `POST /auth/refresh`
No body needed (reads HTTP-only cookie).
```json
Response (200): Sets new cookies
Body: { "expires_in": 900 }

Response (401): { "error": "REFRESH_TOKEN_INVALID" }
```

#### `POST /auth/logout`
```json
Response (200): Clears cookies, revokes token family
Body: { "message": "Logged out" }
```

#### `GET /auth/userinfo`
Requires valid access_token cookie.
```json
Response (200):
{
  "sub": "uuid",
  "email": "user@example.com",
  "displayName": "Tanaka",
  "iat": 1699999100
}
```

### 9.2 Checkbox Routes

#### `GET /api/checkboxes/state`
Returns full binary state for initial page load.
```
Response (200):
Content-Type: application/octet-stream
Body: 125000 bytes of raw binary (the full bitfield)
```

#### `GET /api/checkboxes/stats`
```json
Response (200):
{
  "total": 1000000,
  "checked": 423819,
  "connectedUsers": 87,
  "lastUpdated": "2024-01-15T12:34:56Z"
}
```

### 9.3 User Routes

#### `POST /api/users/register`
```json
Request: { "email": "...", "password": "...", "displayName": "..." }
Response (201): { "message": "Account created. Please log in." }
```

---

## 10. Frontend Specification

### 10.1 Design Direction — Japanese Wabi-Sabi

**Aesthetic:** Ink on rice paper. Quiet. Precise. Ancient meets digital.

**Color palette:**
```css
--bg-primary:    #F5F0E8;    /* warm cream / washi paper */
--bg-secondary:  #EDE8DC;    /* slightly darker paper */
--ink-deep:      #1C1408;    /* sumi ink black */
--ink-mid:       #4A3728;    /* aged ink brown */
--ink-light:     #8B7355;    /* diluted ink */
--accent-red:    #C0392B;    /* vermillion seal (hanko) */
--accent-gold:   #C9A84C;    /* aged gold */
--checkbox-off:  #D4CDB8;    /* empty checkbox */
--checkbox-on:   #1C1408;    /* checked = ink fill */
--border-faint:  rgba(28,20,8,0.12);
```

**Typography:**
```css
/* Display: Japanese brush-like weight contrast */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700&family=Noto+Sans+JP:wght@300;400&display=swap');

--font-display:  'Noto Serif JP', serif;    /* headings */
--font-body:     'Noto Sans JP', sans-serif; /* UI text */
```

**Visual motifs:**
- Thin horizontal rules (like manuscript lines)
- Red circular seal/stamp for the toggle count
- Subtle ink-wash gradient in header
- Checkbox fill animation: ink-drop spread (CSS radial scale from center)
- On anonymous click: paper-fold reveal of login prompt (CSS transform)

### 10.2 Page Structure

#### `index.html` — Main Application

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
│  一百万个复选框   [●123 online]    [Login / Avatar] │
│  ─────────────────────────────────────────────────  │
│  STATS BAR                                          │
│  423,819 / 1,000,000 checked  ████████░░░░  42.3%  │
│  ─────────────────────────────────────────────────  │
│  GRID (virtualized, ~visible viewport only)         │
│  □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □         │
│  □ ■ □ □ ■ □ □ □ ■ □ □ □ □ ■ □ □ □ □ □ □         │
│  □ □ □ ■ □ □ □ □ □ □ □ □ □ □ □ □ ■ □ □ □         │
│  ... (virtual scroll)                               │
│  ─────────────────────────────────────────────────  │
│  FOOTER                                             │
│  Connection: ● Live  |  Built with 墨 (ink)         │
└─────────────────────────────────────────────────────┘
```

#### Login Prompt (Anonymous Click)

```
┌──────────────────────────────────┐
│        ✦  参加する  ✦            │  ← "Join" in Japanese
│                                  │
│  この空間に参加するには           │
│  ログインが必要です               │  ← "Login required to join"
│                                  │
│  [  ログイン  ]  [  登録  ]      │
│                                  │
│  閲覧のみ続ける →               │
└──────────────────────────────────┘
```

### 10.3 Virtual Grid Rendering

1M checkboxes cannot all be in the DOM. Use a virtual scroller:

```javascript
// grid.js — Virtual Scroll Strategy
const TOTAL = 1_000_000;
const COLS = 100;             // 100 per row = 10,000 rows
const ROWS = TOTAL / COLS;
const ROW_HEIGHT = 20;        // px
const VIEWPORT_ROWS = Math.ceil(window.innerHeight / ROW_HEIGHT) + 4; // buffer

// Only render visible rows
function getVisibleRange(scrollTop) {
  const startRow = Math.floor(scrollTop / ROW_HEIGHT);
  const endRow = Math.min(startRow + VIEWPORT_ROWS, ROWS);
  return { startRow, endRow };
}

// On scroll: re-render only changed rows
// Use transform: translateY() on a container div for position
// Outer div has height = ROWS * ROW_HEIGHT (creates scrollbar)
// Inner div renders only visible rows, offset via transform
```

**State storage on client:**
```javascript
// Uint8Array of 125,000 bytes — mirrors server bitfield exactly
const state = new Uint8Array(125000);

function getCheckbox(index) {
  const byte = Math.floor(index / 8);
  const bit = 7 - (index % 8);
  return (state[byte] >> bit) & 1;
}

function setCheckbox(index, value) {
  const byte = Math.floor(index / 8);
  const bit = 7 - (index % 8);
  if (value) state[byte] |= (1 << bit);
  else state[byte] &= ~(1 << bit);
}
```

### 10.4 Auth Flow on Frontend

```javascript
// auth.js
class AuthManager {
  // No localStorage. State is in memory only.
  // User info comes from /auth/userinfo on page load.
  // Tokens are in HTTP-only cookies (invisible to JS).

  async init() {
    try {
      const res = await fetch('/auth/userinfo', { credentials: 'include' });
      if (res.ok) {
        this.user = await res.json();
        this.authenticated = true;
      } else if (res.status === 401) {
        // Try refresh
        const refreshed = await this.tryRefresh();
        if (!refreshed) this.authenticated = false;
      }
    } catch { this.authenticated = false; }
  }

  async tryRefresh() {
    const res = await fetch('/auth/refresh', { method: 'POST', credentials: 'include' });
    if (res.ok) {
      await this.init(); // re-fetch userinfo with new token
      return true;
    }
    return false;
  }

  startLogin() {
    // PKCE
    const verifier = generateCodeVerifier();    // 43-128 random chars
    sessionStorage.setItem('cv', verifier);     // OK: sessionStorage for verifier (not a token)
    const challenge = await sha256base64url(verifier);
    const state = generateState();
    sessionStorage.setItem('st', state);

    const params = new URLSearchParams({
      client_id: 'million-checkboxes',
      redirect_uri: `${location.origin}/callback`,
      response_type: 'code',
      scope: 'openid profile',
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });
    location.href = `/auth/authorize?${params}`;
  }

  async handleCallback() {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    // Verify state matches
    if (state !== sessionStorage.getItem('st')) throw new Error('State mismatch');
    const verifier = sessionStorage.getItem('cv');
    sessionStorage.removeItem('cv');
    sessionStorage.removeItem('st');

    await fetch('/auth/token', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, code_verifier: verifier, client_id: 'million-checkboxes',
                             redirect_uri: `${location.origin}/callback`, grant_type: 'authorization_code' }),
    });
    location.href = '/';
  }
}
```

> **Note on sessionStorage:** The PKCE code verifier and state nonce are stored in sessionStorage only for the duration of the login redirect (seconds). This is the correct per-spec approach — they are not tokens and have no value after the auth code is exchanged.

### 10.5 WebSocket Client

```javascript
// ws.js
class WSClient {
  constructor(authManager) {
    this.auth = authManager;
    this.reconnectDelay = 1000;
    this.maxDelay = 30000;
  }

  connect() {
    this.ws = new WebSocket(`wss://${location.host}/ws`);
    // Cookies auto-sent with WebSocket upgrade

    this.ws.onopen = () => {
      this.reconnectDelay = 1000;
      console.log('Connected');
    };

    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      this.handleMessage(msg);
    };

    this.ws.onclose = (e) => {
      if (e.code === 4001) {
        // Auth failure - don't reconnect, show login
        this.auth.authenticated = false;
        return;
      }
      // Exponential backoff reconnect
      setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxDelay);
    };
  }

  handleMessage(msg) {
    switch (msg.type) {
      case 'checkbox_update':
        setCheckbox(msg.index, msg.value);
        grid.updateCell(msg.index);
        break;
      case 'error':
        if (msg.code === 'AUTH_REQUIRED') showLoginPrompt();
        if (msg.code === 'RATE_LIMITED') showRateLimitFeedback(msg.retryAfter);
        break;
      case 'pong':
        updateConnectedCount(msg.connectedUsers);
        break;
    }
  }

  toggle(index) {
    if (this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type: 'toggle', index }));
  }
}
```

---

## 11. Task Breakdown for IDE Agent

> Execute these tasks **in order**. Each task is self-contained. Complete and verify each before moving to the next.

---

### TASK 1 — Project Scaffolding

**What to do:**
1. Run `npm init -y` in the project root
2. Install dependencies:
   ```bash
   npm install express ws redis jsonwebtoken bcrypt cookie-parser crypto uuid dotenv cors helmet
   npm install --save-dev nodemon
   ```
3. Create the full directory structure as shown in Section 3 (all folders and empty placeholder files)
4. Create `.env.example` with all keys from Section 12
5. Create `package.json` scripts: `"start": "node src/server/index.js"`, `"dev": "nodemon src/server/index.js"`
6. Create `docker-compose.yml` with a Redis service (image: redis:7-alpine, port 6379)

**Verify:** `npm run dev` starts without errors (even with empty files)

---

### TASK 2 — Redis Client & Config

**What to do:**
1. Implement `src/server/config/index.js` — reads all env vars, validates required ones, exports config object
2. Implement `src/server/config/redis.js` — factory function that creates an `ioredis` client (switch to `ioredis` for better pipeline support: `npm install ioredis`)
   - Creates two clients: one for general use, one dedicated subscriber
   - Handles connection errors with logging
   - Exports `{ redis, subscriber, publisher }`
3. Initialize the Redis bitfield on first run: check if key exists, if not, set all 1M bits to 0 using `SET checkboxes "\x00" * 125000` approach

**Verify:** Running `node -e "const {redis}=require('./src/server/config/redis'); redis.ping().then(console.log)"` prints "PONG"

---

### TASK 3 — Models

**What to do:**

**`CheckboxModel.js`:**
```javascript
- toggleBit(index)          → reads current, flips, returns newValue
- getBit(index)             → returns 0 or 1
- getFullState()            → returns Buffer of 125000 bytes
- getStats()                → returns { total: 1000000, checked: count }
  // For count: use BITCOUNT checkboxes
```

**`TokenModel.js`:**
```javascript
- storeRefreshToken(hash, { userId, familyId, issuedAt, expiresAt, userAgent, ip })
- getRefreshToken(hash)     → returns stored object or null
- deleteRefreshToken(hash)  → deletes
- revokeFamily(familyId)   → store familyId in a revoked-families set (TTL 8 days)
- isFamilyRevoked(familyId) → boolean
```

**`RateLimitModel.js`:**
```javascript
- checkWsLimit(userId)      → { allowed, remaining, retryAfter }
- checkHttpLimit(ip, endpoint, max, windowSeconds) → { allowed, remaining, retryAfter }
```

**`UserModel.js`:**
```javascript
- createUser({ email, password, displayName }) → saves hashed password, returns user object
- getUserByEmail(email)     → returns user or null
- getUserById(id)           → returns user or null
```

**Verify:** Write a quick unit test script that calls each method

---

### TASK 4 — Auth Service & JWT

**What to do:**

1. Generate RSA key pair on startup (or load from env):
   ```javascript
   // Use node:crypto
   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
   ```
   Store as PEM strings in env vars `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY`.

2. Implement `services/authService.js`:
   ```javascript
   - signAccessToken(user)      → signed JWT (15 min, RS256)
   - verifyAccessToken(token)   → decoded payload or null
   - generateRefreshToken()     → crypto.randomBytes(64).toString('hex')
   - hashToken(token)           → SHA256 hex string
   - generateAuthCode()         → crypto.randomBytes(32).toString('hex')
   - generateCodeVerifier()     → 43-char random base64url
   - verifyPKCE(verifier, challenge) → boolean (SHA256 of verifier === challenge)
   - buildJWKS()                → JWK set from public key
   ```

3. Implement `services/rateLimitService.js` — thin wrapper around RateLimitModel with logging

4. Implement `services/checkboxService.js`:
   ```javascript
   - toggle(index, userId)  → calls CheckboxModel.toggleBit, then PUBLISH to Redis
   - getFullState()         → calls CheckboxModel.getFullState
   - getStats()             → calls CheckboxModel.getStats, adds connectedUsers count
   - getChunk(byteStart, byteEnd) → slice of full state as base64
   ```

**Verify:** Unit test signAccessToken → verifyAccessToken round-trip

---

### TASK 5 — Auth Server (OIDC Provider)

**What to do:**

Implement `controllers/authController.js` with these handler functions:

**`authorize(req, res)`:**
- Validate `client_id === 'million-checkboxes'`
- Validate `redirect_uri` is in allowed list
- Validate `response_type === 'code'`
- Validate `code_challenge` is present and `code_challenge_method === 'S256'`
- Store `{ codeChallenge, redirectUri, clientId, state }` in Redis with key `oidc:state:{state}` (TTL 600s)
- Redirect to `/login.html?state={state}`

**`login(req, res)`:**
- Extract `{ email, password, state }` from body
- Rate limit: 5/15min per IP
- Lookup state in Redis, verify it exists
- Lookup user by email, verify bcrypt password
- Generate auth code, store `{ code → { userId, codeChallenge, clientId } }` in Redis (TTL 300s)
- Delete state from Redis
- Redirect to `redirectUri?code={code}&state={state}`

**`token(req, res)`:**
- Validate grant_type, client_id, redirect_uri
- Lookup code in Redis, delete it (one-time use)
- Verify PKCE: SHA256(code_verifier) must equal stored codeChallenge
- Look up user by stored userId
- Issue accessToken and refreshToken
- Store hashed refreshToken in Redis via TokenModel
- Set cookies:
  ```javascript
  res.cookie('access_token', accessToken, {
    httpOnly: true, secure: true, sameSite: 'Strict',
    maxAge: 15 * 60 * 1000
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true, secure: true, sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/auth/refresh'  // scoped — only sent to refresh endpoint
  });
  ```
- Return `{ token_type: 'Bearer', expires_in: 900 }`

**`refresh(req, res)`:**
- Read `refresh_token` cookie
- Hash it, look up in Redis
- If not found: check if family is revoked → security event if so; return 401
- Delete old token from Redis
- Issue new accessToken + new refreshToken (same familyId)
- Update cookies

**`logout(req, res)`:**
- Read and hash refresh token cookie
- Look up familyId
- Call TokenModel.revokeFamily(familyId)
- Delete token from Redis
- Clear both cookies
- Return 200

**`userinfo(req, res)`:**
- Requires authenticate middleware
- Return `{ sub, email, displayName }` from req.user

**`jwks(req, res)`:**
- Return `{ keys: [authService.buildJWKS()] }`

**`register(req, res)`:**
- Validate email format, password strength (min 8 chars, 1 number)
- Rate limit: 3/hour per IP
- Check email not already taken
- Call UserModel.createUser
- Return 201

**Verify:** Use curl or Postman to test the full auth code flow manually

---

### TASK 6 — Middleware

**What to do:**

**`middleware/authenticate.js`:**
```javascript
// Reads access_token cookie
// Verifies JWT using authService.verifyAccessToken
// If valid: sets req.user = decoded payload, calls next()
// If invalid (expired, malformed): returns 401 JSON
// Optional: req.optionalUser for routes that work for both auth and anon
```

**`middleware/rateLimitHttp.js`:**
```javascript
// createRateLimiter(endpoint, max, windowSeconds)
// Returns middleware function as described in Section 6.3
// Sets X-RateLimit-* headers
```

**`middleware/errorHandler.js`:**
```javascript
// Global Express error handler (4-argument function)
// Logs error stack in development
// Returns JSON error response
// Never leaks stack traces in production
```

---

### TASK 7 — Routes

**What to do:**

**`routes/auth.routes.js`:**
```javascript
router.get('/authorize', authorize);
router.post('/login', createRateLimiter('login', 5, 900), login);
router.post('/token', token);
router.post('/refresh', createRateLimiter('refresh', 20, 60), refresh);
router.post('/logout', logout);
router.get('/userinfo', authenticate, userinfo);
router.get('/jwks', jwks);
router.post('/register', createRateLimiter('register', 3, 3600), register);
```

**`routes/checkbox.routes.js`:**
```javascript
router.get('/state', createRateLimiter('checkbox-state', 30, 60), getState);
router.get('/stats', getStats);
```

**`routes/index.js`:**
```javascript
app.use('/auth', authRoutes);
app.use('/api/checkboxes', checkboxRoutes);
app.use(errorHandler);
```

---

### TASK 8 — Express App & Server Entry

**What to do:**

**`app.js`:**
```javascript
const app = express();
app.use(helmet());
app.use(cors({ origin: config.frontendOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
// Mount routes
// Mount error handler last
module.exports = app;
```

**`index.js`:**
```javascript
const http = require('http');
const app = require('./app');
const { setupWSServer } = require('./websocket/wsServer');
const { startPubSub } = require('./websocket/pubsub');

const server = http.createServer(app);
setupWSServer(server);
startPubSub();

server.listen(config.port, () => console.log(`Server on port ${config.port}`));
```

---

### TASK 9 — WebSocket Server & Handler

**What to do:**

Implement `websocket/wsServer.js`, `wsHandler.js`, `pubsub.js` exactly as specified in Sections 7 and 8.

Key details:
- Parse cookies from `request.headers.cookie` using a simple manual parser (not middleware, since this isn't Express)
- Handle WS errors gracefully (try/catch around all sends)
- Add a heartbeat: server pings all clients every 30s; remove dead connections
- Track connected users count, expose it in pong responses

**Verify:** Open two browser tabs, toggle a checkbox in one, see it update in the other

---

### TASK 10 — Frontend HTML & CSS

**What to do:**

**`public/index.html`:**
Complete HTML with:
- Google Fonts import (Noto Serif JP, Noto Sans JP)
- Link to CSS files
- Header with title (mix of English and Japanese: "一百万", subtitle "One Million Checkboxes")
- Stats bar with progress bar
- Grid container div (empty, populated by JS)
- Login modal overlay (hidden by default)
- Footer with connection status indicator
- Script tags for JS files

**`public/login.html`:**
- Login form: email + password inputs
- Register link
- Japanese styling consistent with main page
- Form submits to `/auth/login` (action attribute), state passed as hidden input

**`public/css/main.css`:**
Implement full Japanese theme:
- CSS custom properties for all colors/fonts (Section 10.1)
- Header styles with subtle ink-wash gradient
- Login modal with paper-fold entrance animation
- Stats bar with brushstroke-style progress fill
- Connection status dot (pulsing green / red)
- Responsive: works on mobile (checkboxes slightly larger on touch)
- Ink-drop checkbox animation: `@keyframes ink-fill { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`
- Decorative elements: thin horizontal rules, red seal stamp for stats

**`public/css/grid.css`:**
- Virtual scroll container styles
- Checkbox element styles (tiny, precise, ink-themed)
- Hover state: slight ink-bleed shadow

**`public/css/animations.css`:**
- Ink drop fill animation
- Login modal slide-up animation
- Rate limit feedback shake animation
- Live update pulse on recently-changed checkboxes

---

### TASK 11 — Frontend JavaScript

**What to do:**

**`public/js/api.js`:**
```javascript
// Thin fetch wrapper
// All requests use credentials: 'include'
// On 401: calls authManager.tryRefresh(), retries once
// On second 401: redirects to login
```

**`public/js/auth.js`:**
Implement `AuthManager` class as specified in Section 10.4 exactly.

**`public/js/grid.js`:**
Implement virtual scroller as specified in Section 10.3:
- `init(stateBuffer)` — initialise Uint8Array from binary response
- `render()` — render visible rows only
- `updateCell(index)` — update a single checkbox DOM element (or re-render its row)
- `onCheckboxClick(index)` — check auth, if anon show modal, else call ws.toggle(index)
- Optimistic update: immediately reflect the toggle locally, revert if server returns error

**`public/js/ws.js`:**
Implement `WSClient` class as specified in Section 10.5.
- On `checkbox_update`: call `grid.updateCell(index)` and update local state
- Ping server every 10 minutes to check token validity
- Reconnect with exponential backoff

**`public/js/app.js`:**
```javascript
// Entry point
document.addEventListener('DOMContentLoaded', async () => {
  const auth = new AuthManager();
  await auth.init();

  // Fetch initial checkbox state
  const res = await fetch('/api/checkboxes/state', { credentials: 'include' });
  const buffer = await res.arrayBuffer();
  const grid = new Grid();
  grid.init(new Uint8Array(buffer));
  grid.render();

  const ws = new WSClient(auth);
  ws.connect();

  // Wire grid clicks to ws
  grid.onCheckboxClick = (index) => {
    if (!auth.authenticated) {
      showLoginModal();
      return;
    }
    ws.toggle(index);
  };

  // Fetch and display stats
  // Update connection status in footer
  // Handle /callback route for OIDC return
  if (location.pathname === '/callback') {
    await auth.handleCallback();
  }
});
```

---

### TASK 12 — Integration Testing & Polish

**What to do:**
1. Test full auth flow: register → login → callback → userinfo → refresh → logout
2. Test WebSocket: two tabs, toggle in one, verify update in other
3. Test rate limiting: send 11 toggles/sec, verify 429/RATE_LIMITED on 11th
4. Test anonymous flow: connect WS without login, click checkbox, verify AUTH_REQUIRED
5. Test refresh token rotation: manually expire access token (shorten TTL in test), verify auto-refresh works
6. Test reuse detection: use a refresh token twice, verify second use returns 401 and family is revoked
7. Verify virtual scroll: scroll through all 1M checkboxes without DOM explosion
8. Add CSRF protection: custom `X-Requested-With: XMLHttpRequest` header check on state-mutating endpoints
9. Add `Helmet` security headers (already in app.js)
10. Verify all cookies are HttpOnly, Secure, SameSite=Strict in production mode

---

## 12. Environment Variables

```bash
# Server
NODE_ENV=production
PORT=3000
FRONTEND_ORIGIN=https://your-domain.com

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n..."
JWT_KEY_ID=key-2024-01
JWT_ISSUER=https://your-domain.com
JWT_AUDIENCE=million-checkboxes

# Auth
AUTH_CODE_TTL=300           # seconds
OIDC_STATE_TTL=600          # seconds
ACCESS_TOKEN_TTL=900        # 15 minutes
REFRESH_TOKEN_TTL=604800    # 7 days

# OIDC Client
OIDC_CLIENT_ID=million-checkboxes
OIDC_REDIRECT_URIS=https://your-domain.com/callback

# Security
COOKIE_SECRET=random-32-char-string-here
```

---

## 13. README Template

```markdown
# 一百万个复选框 — One Million Checkboxes

A real-time collaborative web app where 1,000,000 checkboxes are shared globally.

## Features
- 1M checkboxes stored as a Redis bitfield (125 KB)
- Real-time sync via WebSockets + Redis Pub/Sub
- OIDC Authorization Code Flow with PKCE
- JWT (RS256) access tokens + rotating refresh tokens
- Custom rate limiting (no external packages)
- Japanese wabi-sabi UI aesthetic
- Virtual scroll — only visible rows rendered

## Tech Stack
Node.js · Express · ws · ioredis · jsonwebtoken · bcrypt · Vanilla JS

## Setup

```bash
# Start Redis
docker-compose up -d

# Generate RSA keys
node -e "
const {generateKeyPairSync} = require('crypto');
const {privateKey,publicKey} = generateKeyPairSync('rsa',{modulusLength:2048,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});
console.log('Private:\n',privateKey);
console.log('Public:\n',publicKey);
"

# Copy keys to .env
cp .env.example .env

npm install
npm run dev
```

## Architecture
See [PRD](./PRD_million_checkboxes.md) for full system design.

## Live Demo
https://your-deployed-url.com
```

---

*Document version 1.0 — Generated for IDE agent execution*  
*All implementation details are prescriptive. Follow exactly.*