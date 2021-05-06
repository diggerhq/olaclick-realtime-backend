const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send('Test');
});

app.post('/connect', (req, res) => {
    res.send('Connect');
});

app.post('/disconnect', (req, res) => {
    res.send('Disconnect');
});

app.post('/default', (req, res) => {
    res.send('Default');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});