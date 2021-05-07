const socket = new WebSocket('ws://ola-ws-dev-ws-server-578380537.us-east-1.elb.amazonaws.com');

socket.addEventListener('open', function () {
    console.log('socket open');
});

socket.onerror = function (event) {
    console.error('socket error:', event);
};

socket.onclose = function (event) {
    console.log('socket close:', event);
};

socket.addEventListener('message', function (event) {
    console.log('Message:', event.data);
    document.getElementById('messages').insertAdjacentHTML('beforeend', '<p>test</p>');
});

document.getElementById('sendButton').addEventListener('click', () => {
    fetch('http://ola-ws-dev-ws-server-578380537.us-east-1.elb.amazonaws.com/broadcast');
});
