const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    const numClients = wsServer.clients.size;
    res.send(`Connected clients: ${numClients}`);
});

app.post('/broadcast', (req, res) => {
    //TODO use SNS for horizontal scalability
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            const data = req.body.message;
            client.send(data);
        }
    });
    res.send(200);
});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const wsServer = new WebSocket.Server({ server });
