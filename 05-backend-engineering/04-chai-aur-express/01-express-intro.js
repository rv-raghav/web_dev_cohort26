const express = require('express');

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json()); // .use means it is a middleware

    app.get('/menu', (req, res) => {
      // this is handler for GET /menu
      res.json({
        items: ['thali', 'biryani'],
      });
    });

    app.get('/search', (req, res) => {
      const { q, limit } = req.query;
      res.json({
        query: q,
        limit: limit || '10',
      });
    });

    app.get('/menu/:id', (req, res) => {
      // this is handler for /menu/123, /menu/456, etc. :id is a path parameter
      const { id } = req.params;
      res.json({
        item: id,
        price: 149,
      });
    });

    app.post('/order', (req, res) => {
      const order = req.body;
      res.status(201).json({
        status: 'success',
        order,
      });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const menuRes = await fetch(`${base}/menu`);
        const menuData = await menuRes.json();
        console.log('GET /menu response:', JSON.stringify(menuData));

        console.log('---------------');

        const searchRes = await fetch(`${base}/search?q=pizza&limit=5`);
        const searchData = await searchRes.json();
        console.log('GET /search response:', JSON.stringify(searchData));

        const menuItemRes = await fetch(`${base}/menu/123`);
        const menuItemData = await menuItemRes.json();
        console.log('GET /menu/123 response:', JSON.stringify(menuItemData));

        const orderRes = await fetch(`${base}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dish: 'biryani',
            quantity: 2,
          }),
        });
        const orderData = await orderRes.json();
        console.log('POST /order response:', JSON.stringify(orderData));
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

function block_2_response() {
  return new Promise((resolve) => {
    const app = express();

    app.get('/text', (req, res) => {
      res.send('Hello, this is a plain text response!');
    });

    app.get('/json', (req, res) => {
      res.json({ message: 'Hello, this is a JSON response!' });
    });

    app.get('/not-found', (req, res) => {
      res.status(404).json({ error: 'Page not found' });
    });

    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    app.get('/old-menu', (req, res) => {
      // add entry in DB to see how many users are still visiting old route
      res.redirect(301, '/new-menu');
    });

    app.get('/xml', (req, res) => {
      res
        .type('application/xml')
        .send('<message>Hello, this is an XML response!</message>');
    });

    app.get('/custom-headers', (req, res) => {
      res.set('X-powered-by', 'ChaiCode');
      res.set('X-version', '1.0.0');
      res.json({
        message: 'Custom headers set',
      });
    });

    app.get('/no-content', (req, res) => {
      res.status(204).end();
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const textRes = await fetch(`${base}/text`);
        const textData = await textRes.text();
        console.log('GET /text response:', textData);
        const jsonRes = await fetch(`${base}/json`);
        const jsonData = await jsonRes.json();
        console.log('GET /json response:', JSON.stringify(jsonData));
        const notFoundRes = await fetch(`${base}/not-found`);
        const notFoundData = await notFoundRes.json();
        console.log('GET /not-found response:', JSON.stringify(notFoundData));
        const healthRes = await fetch(`${base}/health`);
        const healthData = await healthRes.json();
        console.log('GET /health response:', JSON.stringify(healthData));
        const oldMenuRes = await fetch(`${base}/old-menu`, {
          redirect: 'manual',
        });
        console.log('GET /old-menu response status:', oldMenuRes.status);
        const xmlRes = await fetch(`${base}/xml`);
        const xmlData = await xmlRes.text();
        console.log('GET /xml response:', xmlData);
        const customHeadersRes = await fetch(`${base}/custom-headers`);
        const customHeadersData = await customHeadersRes.json();
        console.log(
          'GET /custom-headers response:',
          JSON.stringify(customHeadersData),
        );
        console.log('Custom Headers:', {
          'X-powered-by': customHeadersRes.headers.get('X-powered-by'),
          'X-version': customHeadersRes.headers.get('X-version'),
        });
        const noContentRes = await fetch(`${base}/no-content`);
        console.log('GET /no-content response status:', noContentRes.status);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    });
  });
}

async function main() {
  await block_1_basicServer();
  await block_2_response();

  process.exit(0);
}

main();
