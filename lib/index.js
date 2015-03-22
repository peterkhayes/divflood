var express = require('express');
var app = express();
var server = require('http').Server(app);
var publicDir = __dirname + '/../public';


app.use(express.static(publicDir));
server.listen(7777);
console.log('HTTP Server listening on 0.0.0.0:7777');

require("./socket")(server);
require("./udp");





