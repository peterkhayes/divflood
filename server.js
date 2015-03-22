var express = require('express');

var app = express();
var img_data = [];
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SIZE = 100;
var UPDATE = 150;

for(var i = 0; i < SIZE; i++) {
    img_data.push([]);
    for ( var j = 0; j < SIZE; j++) {
        img_data[i].push(null);
    }
}

app.get("/", express.static('public'));

server.listen(7777);
var socket;

var send_data = function() {
    socket.emit('IMG', img_data);
};

io.on('connection', function (mysocket) {
  socket = mysocket;
  setInterval(send_data, UPDATE);
});

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    console.log('HTTP Server listening on 0.0.0.0:7777');
});

server.on('message', function (message, remote) {
    parts = String(message).split(' ');

    x_coord = Number(parts[0]);
    y_coord = Number(parts[1]);


    if (!(x_coord % 1) && x_coord < 100 && x_coord >= 0 && !(y_coord % 1) && y_coord < 100 && y_coord >= 0) {
        img_data[y_coord][x_coord] = parts[2].replace(/\s/g, '');
    }

});

server.bind(6666, '0.0.0.0');
