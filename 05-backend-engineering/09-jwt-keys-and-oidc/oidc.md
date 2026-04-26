# OpenID Connect (OIDC)

> A modern identity layer built on top of OAuth 2.0 that enables secure, standardized authentication across applications and services.

---

## Table of Contents

- [What is OIDC?](#what-is-oidc)
- [How OIDC Differs from OAuth 2.0](#how-oidc-differs-from-oauth-20)
- [Core Concepts](#core-concepts)
  - [Parties Involved](#parties-involved)
  - [Tokens](#tokens)
  - [Scopes](#scopes)
  - [Claims](#claims)
- [OIDC Flows](#oidc-flows)
  - [Authorization Code Flow](#1-authorization-code-flow-recommended)
  - [Authorization Code Flow with PKCE](#2-authorization-code-flow-with-pkce)
  - [Implicit Flow (Deprecated)](#3-implicit-flow-deprecated)
  - [Hybrid Flow](#4-hybrid-flow)
  - [Client Credentials Flow](#5-client-credentials-flow)
- [Discovery Document](#discovery-document)
- [ID Token Deep Dive](#id-token-deep-dive)
  - [Structure](#structure)
  - [Standard Claims](#standard-claims)
  - [Validation](#id-token-validation)
- [UserInfo Endpoint](#userinfo-endpoint)
- [PKCE (Proof Key for Code Exchange)](#pkce-proof-key-for-code-exchange)
- [Session Management](#session-management)
- [Security Considerations](#security-considerations)
- [Common OIDC Providers](#common-oidc-providers)
- [Implementation Guide](#implementation-guide)
  - [Using a Library (Recommended)](#using-a-library-recommended)
  - [Manual Implementation](#manual-implementation)
- [OIDC vs SAML](#oidc-vs-saml)
- [Troubleshooting](#troubleshooting)
- [Glossary](#glossary)
- [Further Reading](#further-reading)

---

## What is OIDC?

**OpenID Connect (OIDC)** is an identity authentication protocol and an extension of the OAuth 2.0 authorization framework. It was finalized in **February 2014** by the OpenID Foundation and has since become the de facto standard for federated authentication on the web.

OIDC allows client applications (called **Relying Parties**) to:

1. Verify the identity of an end-user based on authentication performed by an **Authorization Server** (called an Identity Provider, or IdP).
2. Obtain basic profile information about the user in a standardized, interoperable way.

In simpler terms: **OAuth 2.0 handles authorization ("what can this app do?"), while OIDC handles authentication ("who is this user?").**

```
Without OIDC:  "This token lets you access the API."
With OIDC:     "This token lets you access the API, AND here's who the user is."
```

---

## How OIDC Differs from OAuth 2.0

| Feature | OAuth 2.0 | OIDC |
|---|---|---|
| Purpose | Authorization (resource access) | Authentication (identity verification) |
| Token type | Access Token | Access Token + **ID Token** |
| User identity | Not defined | Defined via ID Token + UserInfo endpoint |
| Standardization | Framework only | Opinionated, interoperable standard |
| Discovery | Not standardized | `.well-known/openid-configuration` |
| Scope | Custom scopes | Includes standard `openid` scope |

OIDC sits **on top of** OAuth 2.0 — it reuses all the OAuth flows but adds:
- The `openid` scope
- The **ID Token** (a JWT containing user identity)
- The **UserInfo endpoint**
- A standardized **Discovery document**

---

## Core Concepts

### Parties Involved

| Role | Also Called | Description |
|---|---|---|
| **End User** | Resource Owner | The human being authenticating |
| **Relying Party (RP)** | Client | Your application requesting authentication |
| **OpenID Provider (OP)** | Identity Provider (IdP), Authorization Server | The server that authenticates the user (e.g., Google, Auth0, Okta) |

### Tokens

OIDC introduces and uses three types of tokens:

#### 1. ID Token
- A **JSON Web Token (JWT)** issued by the OpenID Provider.
- Contains **identity claims** about the authenticated user (e.g., `sub`, `email`, `name`).
- Must be validated by the Relying Party.
- **Not** meant to be sent to resource servers as an access credential.

#### 2. Access Token
- Used to access protected resources (APIs).
- Can be opaque or a JWT, depending on the provider.
- Sent to the **UserInfo endpoint** to retrieve additional user claims.

#### 3. Refresh Token
- A long-lived token used to obtain new Access Tokens without re-authenticating the user.
- Should be stored securely and rotated on use.

### Scopes

Scopes determine what information the Relying Party can request. OIDC defines standard scopes:

| Scope | Claims Returned |
|---|---|
| `openid` | `sub` (subject identifier) — **required** |
| `profile` | `name`, `family_name`, `given_name`, `nickname`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, `updated_at` |
| `email` | `email`, `email_verified` |
| `address` | `address` (structured object) |
| `phone` | `phone_number`, `phone_number_verified` |
| `offline_access` | Requests a Refresh Token |

**Example scope string:**
```
openid profile email offline_access
```

### Claims

Claims are key-value pairs inside tokens that represent information about the user or the authentication event.

**Identity claims** (user info):
- `sub` — Subject identifier (unique user ID, stable across sessions)
- `email`, `email_verified`
- `name`, `given_name`, `family_name`
- `picture`, `locale`, `zoneinfo`

**Token metadata claims**:
- `iss` — Issuer (the OpenID Provider's URL)
- `aud` — Audience (the client_id of your app)
- `exp` — Expiration time (Unix timestamp)
- `iat` — Issued at time (Unix timestamp)
- `nonce` — A random value to prevent replay attacks
- `at_hash` — Access token hash (for validation)
- `auth_time` — Time when the user authenticated
- `acr` — Authentication Context Class Reference (e.g., MFA level)
- `amr` — Authentication Methods References (e.g., `["pwd", "otp"]`)

---

## OIDC Flows

### 1. Authorization Code Flow (Recommended)

The most secure flow for server-side applications. The user's tokens are never exposed to the browser.

```
┌──────────┐        ┌─────────────────┐        ┌──────────────────┐
│  Browser │        │  Relying Party  │        │  OpenID Provider │
│ (User)   │        │  (Your App)     │        │  (e.g., Google)  │
└────┬─────┘        └────────┬────────┘        └────────┬─────────┘
     │                       │                          │
     │  1. Click "Login"     │                          │
     │──────────────────────>│                          │
     │                       │                          │
     │  2. Redirect to OP    │                          │
     │<──────────────────────│                          │
     │                       │                          │
     │  3. Authenticate      │                          │
     │─────────────────────────────────────────────────>│
     │                       │                          │
     │  4. Redirect + code   │                          │
     │<─────────────────────────────────────────────────│
     │                       │                          │
     │  5. Send code to RP   │                          │
     │──────────────────────>│                          │
     │                       │  6. Exchange code        │
     │                       │─────────────────────────>│
     │                       │                          │
     │                       │  7. ID Token +           │
     │                       │     Access Token         │
     │                       │<─────────────────────────│
     │                       │                          │
     │  8. Session created   │                          │
     │<──────────────────────│                          │
```

**Step-by-step:**

1. User clicks "Login with [Provider]"
2. App redirects user to the OP's authorization endpoint with:
   - `response_type=code`
   - `client_id`
   - `redirect_uri`
   - `scope=openid profile email`
   - `state` (random, for CSRF protection)
   - `nonce` (random, for replay attack protection)
3. User authenticates at the OP
4. OP redirects back to `redirect_uri` with an authorization `code` and the `state`
5. App validates `state`, then sends `code` to the OP's token endpoint (server-to-server)
6. OP returns ID Token, Access Token (and optionally Refresh Token)
7. App validates the ID Token and establishes a user session

**Authorization Request Example:**
```
GET https://accounts.google.com/o/oauth2/auth
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=openid%20profile%20email
  &state=abc123xyz
  &nonce=randomnonce456
```

**Token Exchange Request:**
```http
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE_HERE
&redirect_uri=https://yourapp.com/callback
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

---

### 2. Authorization Code Flow with PKCE

The recommended flow for **Single Page Apps (SPAs)** and **native/mobile apps** where a client secret cannot be stored securely. See [PKCE section](#pkce-proof-key-for-code-exchange) for details.

---

### 3. Implicit Flow (Deprecated)

> ⚠️ **Deprecated** — Do not use for new applications. Use Authorization Code + PKCE instead.

Tokens were returned directly in the URL fragment. Abandoned due to security risks (token leakage via browser history, referrer headers, logs).

---

### 4. Hybrid Flow

Returns some tokens from the authorization endpoint and others from the token endpoint. Used in specific enterprise scenarios (e.g., when a front-end needs an ID Token immediately but the back-end handles access tokens).

**response_type values:**
- `code id_token`
- `code token`
- `code id_token token`

---

### 5. Client Credentials Flow

Used for **machine-to-machine (M2M)** authentication — no user is involved. Not an OIDC flow per se (no ID Token issued), but often used alongside OIDC systems for service accounts and APIs.

---

## Discovery Document

Every compliant OIDC provider exposes a **Discovery Document** at a well-known URL:

```
{issuer}/.well-known/openid-configuration
```

**Examples:**
- `https://accounts.google.com/.well-known/openid-configuration`
- `https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration`
- `https://YOUR_DOMAIN.auth0.com/.well-known/openid-configuration`

**Key fields in the discovery document:**

```json
{
  "issuer": "https://accounts.google.com",
  "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
  "token_endpoint": "https://oauth2.googleapis.com/token",
  "userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo",
  "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
  "response_types_supported": ["code", "token", "id_token", "code token", "code id_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "scopes_supported": ["openid", "email", "profile"],
  "claims_supported": ["sub", "iss", "email", "name", "picture", ...],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic"]
}
```

Always fetch and cache the discovery document rather than hardcoding endpoint URLs.

---

## ID Token Deep Dive

### Structure

An ID Token is a **JWT** (JSON Web Token) with three Base64URL-encoded parts:

```
header.payload.signature
```

**Decoded example:**

```json
// Header
{
  "alg": "RS256",
  "kid": "key-id-for-jwks-lookup",
  "typ": "JWT"
}

// Payload
{
  "iss": "https://accounts.google.com",
  "sub": "110169484474386276334",
  "aud": "your-client-id.apps.googleusercontent.com",
  "exp": 1716239022,
  "iat": 1716235422,
  "nonce": "randomnonce456",
  "email": "alice@example.com",
  "email_verified": true,
  "name": "Alice Smith",
  "picture": "https://lh3.googleusercontent.com/...",
  "given_name": "Alice",
  "family_name": "Smith",
  "locale": "en"
}

// Signature (cryptographic, verify using provider's public key from jwks_uri)
```

### Standard Claims

| Claim | Required | Description |
|---|---|---|
| `iss` | ✅ | Issuer — must match the provider's URL |
| `sub` | ✅ | Subject — unique, stable user ID |
| `aud` | ✅ | Audience — must include your client_id |
| `exp` | ✅ | Expiration time |
| `iat` | ✅ | Issued at |
| `auth_time` | Conditional | Required if `max_age` was requested |
| `nonce` | Conditional | Required if `nonce` was sent in request |
| `acr` | Optional | Authentication Context Class Reference |
| `amr` | Optional | Authentication Methods References |
| `azp` | Optional | Authorized party (when aud has multiple values) |

### ID Token Validation

**Never skip validation.** A Relying Party MUST validate the ID Token before trusting its contents:

1. **Verify the signature** using the public key from the provider's `jwks_uri`
2. **Check `iss`** matches the expected issuer from the discovery document
3. **Check `aud`** contains your `client_id`
4. **Check `exp`** — token must not be expired
5. **Check `iat`** — should be recent (allow for clock skew, typically ±5 minutes)
6. **Check `nonce`** — if you sent one, verify it matches (prevents replay attacks)
7. **Check `at_hash`** — if present and an access token was returned, validate the hash

---

## UserInfo Endpoint

After obtaining an Access Token, you can retrieve additional user claims by calling the UserInfo endpoint:

```http
GET https://openidconnect.googleapis.com/v1/userinfo
Authorization: Bearer ACCESS_TOKEN_HERE
```

**Response:**
```json
{
  "sub": "110169484474386276334",
  "name": "Alice Smith",
  "given_name": "Alice",
  "family_name": "Smith",
  "picture": "https://lh3.googleusercontent.com/...",
  "email": "alice@example.com",
  "email_verified": true,
  "locale": "en"
}
```

**Note:** The `sub` claim in the UserInfo response must match the `sub` in the ID Token — if they differ, the response must be rejected.

---

## PKCE (Proof Key for Code Exchange)

PKCE (RFC 7636) protects the authorization code flow against interception attacks in public clients (SPAs, mobile apps) that cannot safely store a client secret.

### How it Works

```
1. App generates a random  code_verifier  (43-128 chars)
   Example: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"

2. App creates  code_challenge  = BASE64URL(SHA256(code_verifier))
   Example: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"

3. Authorization Request includes:
   &code_challenge=E9Melho...
   &code_challenge_method=S256

4. OP stores the code_challenge linked to the authorization code

5. Token Request includes the original:
   &code_verifier=dBjftJeZ...

6. OP verifies: SHA256(code_verifier) == stored code_challenge
   ✅ If match → issue tokens
   ❌ If mismatch → reject request
```

### Implementation

```javascript
// Generate code_verifier
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

// Generate code_challenge
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(digest));
}

function base64URLEncode(buffer) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
```

> **Best Practice:** Use PKCE for **all** authorization code flows, even for confidential clients. It adds protection even when a client secret is used.

---

## Session Management

OIDC provides several mechanisms for session management:

### Session State
The OP maintains a session cookie for the authenticated user. The RP can track its own session independently.

### Front-Channel Logout
The OP notifies the RP by loading a logout URL in a hidden iframe, passing a `sid` (session ID) claim. Relies on third-party cookies (increasingly restricted in modern browsers).

```
GET https://yourapp.com/logout?iss=https://op.example.com&sid=session-id
```

### Back-Channel Logout
The OP sends an HTTP POST directly to the RP's server with a **Logout Token** (JWT). More reliable than front-channel. Does not depend on browser cookies.

```http
POST https://yourapp.com/backchannel-logout
Content-Type: application/x-www-form-urlencoded

logout_token=eyJhbGci...
```

### RP-Initiated Logout
The RP redirects the user to the OP's `end_session_endpoint`:

```
GET https://accounts.google.com/logout
  ?id_token_hint=ID_TOKEN
  &post_logout_redirect_uri=https://yourapp.com/loggedout
  &state=randomstate
```

---

## Security Considerations

### ✅ Do

- **Always use HTTPS** — never transmit tokens over HTTP
- **Validate the ID Token** completely (see [ID Token Validation](#id-token-validation))
- **Use PKCE** for all public clients (SPAs, mobile) and recommended for all clients
- **Validate the `state` parameter** to prevent CSRF attacks
- **Use the `nonce` parameter** to prevent replay attacks
- **Store tokens securely** — Access Tokens in memory (SPA), Refresh Tokens in HttpOnly cookies or secure storage
- **Use short token lifetimes** for Access Tokens (5–15 minutes typical)
- **Rotate Refresh Tokens** (Refresh Token Rotation) to detect theft
- **Verify `aud` and `iss` claims** carefully — prevents token substitution attacks
- **Use the `sub` claim** (not `email`) as the primary user identifier — email can change

### ❌ Don't

- **Don't use the Implicit Flow** — it's deprecated and insecure
- **Don't store tokens in `localStorage`** — vulnerable to XSS
- **Don't skip signature verification** on ID Tokens
- **Don't trust Access Tokens as proof of identity** — use the ID Token or UserInfo endpoint
- **Don't accept tokens from unexpected issuers**
- **Don't use the `email` claim as a unique identifier** — it can change or be shared across providers
- **Don't use long-lived Access Tokens** — minimizes damage if leaked

### Common Attack Vectors

| Attack | Mitigation |
|---|---|
| CSRF | Validate `state` parameter |
| Replay attack | Use and verify `nonce`; check `exp` and `iat` |
| Token theft | Short lifetimes, Refresh Token Rotation, secure storage |
| Authorization code interception | Use PKCE |
| Open redirect | Whitelist `redirect_uri` values at the OP |
| Mix-up attack | Validate `iss` claim; use issuer-specific redirect URIs |

---

## Common OIDC Providers

| Provider | Discovery URL |
|---|---|
| Google | `https://accounts.google.com/.well-known/openid-configuration` |
| Microsoft (Azure AD) | `https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration` |
| Apple | `https://appleid.apple.com/.well-known/openid-configuration` |
| Auth0 | `https://{your-domain}.auth0.com/.well-known/openid-configuration` |
| Okta | `https://{your-domain}.okta.com/.well-known/openid-configuration` |
| Keycloak | `https://{host}/realms/{realm}/.well-known/openid-configuration` |
| AWS Cognito | `https://cognito-idp.{region}.amazonaws.com/{pool-id}/.well-known/openid-configuration` |
| GitHub (via OIDC) | Supports OIDC for Actions; limited OIDC for apps |
| GitLab | `https://gitlab.com/.well-known/openid-configuration` |
| PingIdentity | `https://{env-id}.pingone.com/{env-id}/as/.well-known/openid-configuration` |

---

## Implementation Guide

### Using a Library (Recommended)

Never implement OIDC from scratch in production. Use a battle-tested library.

#### JavaScript / Node.js

```bash
# Recommended libraries
npm install openid-client        # Low-level, standards-compliant (Panva)
npm install oidc-client-ts       # For SPAs (browser)
npm install @auth0/nextjs-auth0  # Next.js
npm install next-auth            # Next.js (multi-provider)
```

**Example with `openid-client` (Node.js):**

```javascript
import { Issuer, generators } from 'openid-client';

// 1. Discover the provider
const issuer = await Issuer.discover('https://accounts.google.com');

// 2. Create a client
const client = new issuer.Client({
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  redirect_uris: ['https://yourapp.com/callback'],
  response_types: ['code'],
});

// 3. Generate authorization URL
const codeVerifier = generators.codeVerifier();
const codeChallenge = generators.codeChallenge(codeVerifier);
const state = generators.state();
const nonce = generators.nonce();

const authUrl = client.authorizationUrl({
  scope: 'openid email profile',
  state,
  nonce,
  code_challenge: codeChallenge,
  code_challenge_method: 'S256',
});

// Redirect user to authUrl...

// 4. Handle callback
const params = client.callbackParams(req);
const tokenSet = await client.callback(
  'https://yourapp.com/callback',
  params,
  { code_verifier: codeVerifier, state, nonce }
);

console.log('ID Token Claims:', tokenSet.claims());
console.log('Access Token:', tokenSet.access_token);

// 5. Get user info
const userinfo = await client.userinfo(tokenSet.access_token);
console.log('User:', userinfo);
```

#### Python

```bash
pip install authlib          # Authlib (full-featured)
pip install python-jose      # JWT validation
pip install requests-oauthlib
```

**Example with Authlib + Flask:**

```python
from authlib.integrations.flask_client import OAuth

oauth = OAuth(app)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_id='YOUR_CLIENT_ID',
    client_secret='YOUR_CLIENT_SECRET',
    client_kwargs={'scope': 'openid email profile'},
)

@app.route('/login')
def login():
    redirect_uri = url_for('callback', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/callback')
def callback():
    token = oauth.google.authorize_access_token()
    user = token.get('userinfo')
    # user['sub'] is the unique user ID
    return f"Hello, {user['name']}!"
```

#### Java / Spring Boot

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: YOUR_CLIENT_ID
            client-secret: YOUR_CLIENT_SECRET
            scope: openid,profile,email
```

#### Go

```bash
go get github.com/coreos/go-oidc/v3/oidc
go get golang.org/x/oauth2
```

---

### Manual Implementation

If you must implement manually (e.g., for a custom identity provider or to deeply understand the protocol):

```javascript
// Step 1: Fetch discovery document
const discovery = await fetch(
  'https://accounts.google.com/.well-known/openid-configuration'
).then(r => r.json());

// Step 2: Build auth URL
const params = new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'openid profile email',
  state: generateRandomState(),
  nonce: generateRandomNonce(),
  code_challenge: await generateCodeChallenge(codeVerifier),
  code_challenge_method: 'S256',
});
const authUrl = `${discovery.authorization_endpoint}?${params}`;

// Step 3: Exchange code for tokens
const tokenResponse = await fetch(discovery.token_endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code_verifier: codeVerifier,
  }),
}).then(r => r.json());

// Step 4: Validate the ID Token
// Fetch JWKS from discovery.jwks_uri, find the key matching the token's kid header,
// verify signature, then validate all claims (iss, aud, exp, nonce, etc.)
```

> ⚠️ **Warning:** Manual JWT validation is error-prone. Use a library like `jose` (JavaScript) or `python-jose` for signature verification.

---

## OIDC vs SAML

| Feature | OIDC | SAML 2.0 |
|---|---|---|
| Format | JSON / JWT | XML |
| Transport | HTTP redirects, REST | HTTP POST, Redirects |
| Age | 2014 | 2005 |
| Mobile/SPA friendly | ✅ Yes | ❌ Complex |
| Complexity | Lower | Higher |
| Enterprise adoption | Growing | Dominant in legacy enterprise |
| Token format | Compact JWT | Verbose XML assertions |
| Discovery | Standardized | Via XML metadata |
| Signing | RS256, ES256, etc. | XML Signatures (xmldsig) |

**When to use OIDC:** New applications, mobile/SPAs, APIs, developer-facing systems, modern cloud apps.

**When to use SAML:** Existing enterprise SSO integrations, legacy vendor software, government systems, when SAML is mandated.

Many modern identity providers (Okta, Azure AD, Auth0) support **both** protocols simultaneously.

---

## Troubleshooting

### `invalid_client`
- Verify your `client_id` and `client_secret` are correct
- Ensure the `redirect_uri` exactly matches what's registered in the OP (including trailing slashes)

### `redirect_uri_mismatch`
- The `redirect_uri` in the request must **exactly** match a registered URI — including scheme, host, port, and path

### `invalid_grant` (on token exchange)
- Authorization codes are single-use — don't call the token endpoint twice
- Codes expire quickly (usually 60–300 seconds)
- Verify `redirect_uri` matches the original authorization request

### ID Token validation failure
- **Signature error:** Your JWKS cache may be stale; re-fetch the public keys
- **Expired token:** Server clocks may be skewed; allow ±5 minutes clock skew
- **Wrong audience:** Ensure you're checking your own `client_id`

### `nonce` mismatch
- Ensure you're storing the nonce in the session before the redirect and retrieving it during callback

### CORS errors (SPA)
- Token endpoint requests from the browser require the OP to support CORS
- Some providers only allow token endpoint calls from server-side; use a BFF (Backend for Frontend) pattern

---

## Glossary

| Term | Definition |
|---|---|
| **OIDC** | OpenID Connect — identity layer on top of OAuth 2.0 |
| **OAuth 2.0** | Authorization framework OIDC is built upon |
| **JWT** | JSON Web Token — compact, URL-safe token format |
| **JWK / JWKS** | JSON Web Key / Key Set — public keys used to verify JWT signatures |
| **RP** | Relying Party — your application |
| **OP / IdP** | OpenID Provider / Identity Provider — the authentication server |
| **Authorization Code** | Short-lived, single-use code exchanged for tokens |
| **ID Token** | JWT containing user identity claims |
| **Access Token** | Token granting access to APIs/resources |
| **Refresh Token** | Long-lived token to obtain new Access Tokens |
| **Scope** | Requested permissions / claim categories |
| **Claim** | A key-value assertion in a token |
| **`sub`** | Subject — the unique, stable user identifier |
| **PKCE** | Proof Key for Code Exchange — security extension for public clients |
| **`state`** | Random value to prevent CSRF attacks |
| **`nonce`** | Random value to prevent replay attacks |
| **Discovery Document** | Well-known JSON metadata document describing an OP |
| **JWKS URI** | URL exposing the OP's public keys for token verification |
| **SSO** | Single Sign-On — log in once, access many apps |
| **BFF** | Backend for Frontend — server-side proxy pattern for SPAs |
| **ACR** | Authentication Context Class Reference — describes authentication strength |
| **AMR** | Authentication Methods References — how the user authenticated |

---

## Further Reading

- 📄 [OpenID Connect Core 1.0 Specification](https://openid.net/specs/openid-connect-core-1_0.html)
- 📄 [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
- 📄 [OAuth 2.0 (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749)
- 📄 [PKCE (RFC 7636)](https://datatracker.ietf.org/doc/html/rfc7636)
- 📄 [JWT (RFC 7519)](https://datatracker.ietf.org/doc/html/rfc7519)
- 📄 [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- 📄 [OAuth 2.0 for Browser-Based Apps (BCP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps)
- 🔧 [jwt.io](https://jwt.io) — JWT decoder and debugger
- 🔧 [oidcdebugger.com](https://oidcdebugger.com) — Test OIDC flows interactively
- 📚 [OAuth 2.0 Simplified](https://www.oauth.com) — Comprehensive guide by Aaron Parecki

---

*Last updated: April 2026*