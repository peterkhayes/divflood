var dgram = require('dgram');
var state = require("./state");
var SIZE = require("./config").SIZE;
var UDP_PORT = require("./config").UDP_PORT;

var server = dgram.createSocket('udp4');

server.on('listening', function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
  parts = String(message).split(' ');

  var x = Math.floor(Number(parts[0]));
  var y = Math.floor(Number(parts[1]));
  var color = (parts[2] || "").replace(/\s/g, '');

  if (x < SIZE && x >= 0 && y < SIZE && y >= 0 && color.length < 20) {
    state.setData(x, y, color);
  }
});

server.bind(UDP_PORT);
