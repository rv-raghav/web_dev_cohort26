const express = require('express');

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json()); // .use means it is a middleware

    const routes = {
      1: {
        id: 1,
        name: 'Dadar to Thane',
        direction: 'north',
      },
      2: {
        id: 2,
        name: 'Thane to Dadar',
        direction: 'south',
      },
    };

    // console.log(Object.values(routes));

    let nextid = 3;

    // list all train
    app.get('/routes', (req, res) => {
      res.json(Object.values(routes));
    });

    // single route by id
    app.get('/routes/:id', (req, res) => {
      // const { id } = req.params;
      // const route = routes[id];

      const route = routes[req.params.id];
      if (!route) return res.status(404).json({ error: 'Route not found' });
      res.json(route);
    });

    app.post('/routes', (req, res) => {
      const newRoute = { id: nextid++, ...req.body };
      routes[newRoute.id] = newRoute;
      res.status(201).json(newRoute);
    });

    app.put('/routes/:id', (req, res) => {
      const id = req.params.id;
      if (!routes[id])
        return res.status(404).json({ error: 'Route not found' });
      routes[id] = { id: Number(id), ...req.body };
      res.json(routes[id]);
    });
    app.patch('/routes/:id', (req, res) => {
      const id = req.params.id;
      if (!routes[id])
        return res.status(404).json({ error: 'Route not found' });
      routes[id] = { name: routes[id].name, ...req.body };
      res.json(routes[id]);
    });

    app.delete('/routes/:id', (req, res) => {
      const id = req.params.id;
      if (!routes[id])
        return res.status(404).json({ error: 'Route not found' });
      delete routes[id];
      res.status(204).send();
    });

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

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json()); // .use means it is a middleware

    // /files/docs/readme.txt
    app.get('/files/*filepath', (req, res) => {
      const filepath = req.params.filepath;
      res.json({ message: `You requested the file at path: ${filepath}` });
    });

    app
      .route('/schedule')
      .get((req, res) => {})
      .post((req, res) => {})
      .put((req, res) => {})
      .delete((req, res) => {});
    
    app.use("/api", (req, res) => {
        // its a prefetch match
    });
    
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
