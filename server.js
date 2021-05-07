const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const redis = require('redis');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.static('public'));

const publisher = redis.createClient('//ola-dev-redis.ewcbvl.ng.0001.use1.cache.amazonaws.com:6379');
const subscriber = publisher.duplicate();
const broadcastChannel = 'ws:broadcast';

app.get('/', (req, res) => {
    const numClients = wsServer.clients.size;
    res.send(`Connected clients: ${numClients}`);
});

app.get('/broadcast', (req, res) => {
    publisher.publish(broadcastChannel, 'test');
    res.send(200);
});

subscriber.on('message', (channel, message) => {
    console.log(channel, message);
    if (channel === broadcastChannel) {
        wsServer.clients.forEach(wsClient => {
            if (wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(message);
            }
        });
    }
});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const wsServer = new WebSocket.Server({ server });
