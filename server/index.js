var express = require('express');
var app = express();
var server = require('http').Server(app);
var HTTP_PORT = require("./config").HTTP_PORT;
var publicDir = __dirname + '/../client';


app.use(express.static(publicDir));
server.listen(HTTP_PORT);
console.log('HTTP Server listening on', HTTP_PORT);

require("./socket")(server);
require("./udp");





