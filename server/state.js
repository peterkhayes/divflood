var config = require("./config");
var EventEmitter = require("events").EventEmitter;

var SIZE = config.SIZE;
var INTERVAL = config.INTERVAL;

var data = [];
var changes = [];

var state = new EventEmitter();
state.setMaxListeners(10000);
state.getData = function() {
  return data;
};
state.setData = function(x, y, color) {
  data[SIZE*y + x] = color;
  changes.push([x, y, color].join(" "));
};

setInterval(function() {
  state.emit("tick", changes);
  changes = [];
}, INTERVAL);

module.exports = state;
