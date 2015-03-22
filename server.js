var express = require('express');

var app = express();
var img_data = [];
var server = require('http').Server(app)
var io = require('socket.io')(server);

for(var i = 0; i < 100; i++) {
    img_data.push([]);
    for ( var j = 0; j < 100; j++) {
        img_data[i].push(null);
    }
}

app.get("/", express.static('public'))

server.listen(7777)
var socket;

var send_data = function() {
    socket.emit('IMG', img_data)
  }

io.on('connection', function (mysocket) {
  socket = mysocket;
  setInterval(send_data, 100);
});

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    parts = String(message).split(' ');

    x_coord = parseInt(parts[0]);
    y_coord = parseInt(parts[1]);

    console.log(remote.address + ':' + remote.port +' - ' + x_coord + ' '  + y_coord);

    img_data[y_coord][x_coord] = parts[2].replace(/\s/g, '');

    console.log(img_data);
});

server.bind(6666, '0.0.0.0');
