var Socket = require("socket.io");
var state = require("./state");

module.exports = function(server) {
  var io = Socket(server);
  
  io.on('connection', function(socket) {
    socket.emit("data", state.getData());
    var listener = socket.emit.bind(socket, "changes");
    state.on("tick", listener);
    socket.on('disconnect', state.removeListener.bind(state, "tick", listener));
  });

};


