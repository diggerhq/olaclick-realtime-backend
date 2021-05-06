const express = require('express');
const app = express();
const port = 3000;

// Storing connections in memory just for demo purposes
// In production a persistent storage like DynamoDB or Postgres should be used
// Otherwise the service won't scale horizontally
const connections = new Set();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send('Test');
});

app.post('/connect', (req, res) => {
    const connectionId = req.body.connectionId;
    connections.add(connectionId);
    res.send('Connect');
});

app.post('/disconnect', (req, res) => {
    const connectionId = req.body.connectionId;
    connections.delete(connectionId);
    res.send('Disconnect');
});

app.post('/default', (req, res) => {
    res.send('Default');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});