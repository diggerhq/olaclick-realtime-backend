const express = require('express');
const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require("@aws-sdk/client-apigatewaymanagementapi");
const https = require('https');
const aws4  = require('aws4');

const app = express();
const port = process.env.PORT || 3000;

// Storing connections in memory just for demo purposes
// In production a persistent storage like DynamoDB or Postgres should be used
// Otherwise the service won't scale horizontally
const connections = new Set(['e7NGKfNFoAMCLeg=']);
const gatewayId = 'mnv8w06et6';

const awsClient = new ApiGatewayManagementApiClient({
    region: 'us-east-1',
    serviceId: 'mnv8w06et6'
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
    connections.forEach(connectionId => {
        const gatewayCommand = new PostToConnectionCommand({
            ConnectionId: connectionId,
            Data: 'test'
        });
        const options = {
            method: 'POST',
            host: `${gatewayId}.execute-api.us-east-1.amazonaws.com/production/@connections`,
            path: `/${connectionId}`,
            service: 'apigateway',
            region: 'us-east-1'
        };
        aws4.sign(options);
        https.request(options, (res) => {
            console.log(res);
        });
    });
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