var Socket = require("socket.io");
var state = require("./state");

module.exports = function(server) {
  var io = Socket(server);
  
  io.on('connection', function(socket) {
    console.log("New socket connection:", socket);
    
    socket.emit("data", state.getData());
    state.on("tick", socket.emit.bind(socket, "changes"));
  });

};


