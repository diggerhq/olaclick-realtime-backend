# olaclick-realtime-backend

Scalable real-time infrastructure with Digger is easy!
```
$ dg env create test
```
Yep, as simple as that. Demo (open on different devices): [OlaClick realtime demo](http://ola-ws-dev-ws-server-578380537.us-east-1.elb.amazonaws.com/demo.html)

## Problem

Horizontal scalability of real-time backends for web apps is not trivial
- The main challenge is that WebSockets are not stateless
- Each client should be connected to the same node for the lifetime of the socket
- This means that the connections have state which needs to be stored somewhere
- Memory on the nodes becomes the bottleneck, and each node can no longer know about all WebSocket connections

## Solution
- Stateless high-throughput Node.js containers on ECS Fargate (infinitely scalable)
- Load balancer with sticky sessions for WebSockets
- Managed Redis pub / sub to broadcast messages across services. Can also be used to store shared state.

![Architecture](https://i.ibb.co/t8V7r1F/Screenshot-2021-05-07-at-21-38-20.png)

With Digger you don't need to build this yourself - it comes out of the box
The demo app uses the standard Digger [target](https://github.com/diggerhq/target-fargate) with minimal modifications.
