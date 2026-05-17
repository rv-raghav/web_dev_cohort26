const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/twitter', (req, res) => {
    res.send('Twitter')
})

app.get('/login', (req, res) => {
    res.send('<h1>Login</h1>')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`)
})