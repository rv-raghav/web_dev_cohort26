const express = require('express');

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();

    const logs = [];
    app.use(express.json({limit: '50kb'})); // .use means it is a middleware
    app.use(express.urlencoded({ extended: true, limit: '50kb' })); // for parsing application/x-www-form-urlencoded
    

    // request logger middleware
    app.use((req, res, next) => {
      // add to database
      // console log everything
      // write in some file
      const logEntry = `${req.method} ${req.url}`;
      logs.push(logEntry);
      console.log(logEntry);

      // if your request hangs forever, it is because you forgot to call next() in middleware
      next(); // call next middleware or route handler
    });

    app.use((req, res, next) => {
      req.startTime = Date.now();

      res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - req.startTime;
        console.log(`Request took ${duration} ms`);
      });
      next();
    });

    function authMe(req, res, next) {
      req.headers['x-auth-token'];

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (token !== 'secret-chaicode') {
        return res.status(403).json({ error: 'Invalid token' });
      }

      // token -> extract data from token -> userID, email

      req.user = { id: 1, name: 'Raghav', role: 'admin' };
      next();
    }

    function getRole(role) {
      return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
          return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
      };
    }

    function rateLimit(maxRequests) {
      let count = 0;

      return (req, res, next) => {
        count++;
        if (count > maxRequests) {
          return res
            .status(429)
            .json({ error: 'Too many requests, please try again later' });
        }
        next();
      };
    }

    const limitedEndPoint = rateLimit(5);

    app.get('/limited', limitedEndPoint, (req, res) => {
      res.json({ message: 'This is a rate limited endpoint' });
    });

    app.get('/profile', authMe, getRole('admin'), (req, res) => {});
    app.get('/profile', authMe, getRole('teacher'), (req, res) => {});
    app.get('/profile', authMe, getRole('student'), (req, res) => {});

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();

        const createRes = await fetch(`${base}/routes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Dadar to Vashi',
            direction: 'north',
          }),
        });
        const createData = await createRes.json();

        console.log('GET /routes response:', JSON.stringify(listData));
        console.log('POST /routes response:', JSON.stringify(createData));
      } catch (error) {
        console.error('Error fetching menu:', error);
      }

      server.close(() => {
        console.log('Server closed');
      });
      resolve();
    });
  });
}

async function main() {
  await block_1_httpMethods();

  process.exit(0);
}

main();
