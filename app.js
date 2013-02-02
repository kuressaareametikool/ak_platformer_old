var fs = require('fs');

var tako = require('tako')
var app = tako()

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

var five = require("johnny-five")

var board = new five.Board();
var freq = 20

board.on("ready", function() {

  app.sockets.on('connection', function (socket) {

    joy1 = new five.Sensor({
      pin: "A0"
      , freq: freq
    });

    joy2 = new five.Sensor({
      pin: "A1"
      , freq: freq
    });

    button1 = new five.Sensor({
      pin: "A2"
      , freq: freq
    });    
  
    joy1.on("read", function(err, val) {
      if (val < 20) app.sockets.emit('message', { key: 'up'}) 
      if (val > 860) app.sockets.emit('message', { key: 'down'}) 
    });

    joy2.on("read", function(err, val) {
      if (val < 20) app.sockets.emit('message', { key: 'left'})  
      if (val > 860) app.sockets.emit('message', { key: 'right'}) 
    });

    button1.on("read", function(err, val) {
      if (val > 894) app.sockets.emit('message', { key: 'button'}) 
    });

  })
})


function convertRange(val, old_min, old_max, new_min, new_max) {
 return Math.round((((val - old_min) * (new_max - new_min) ) / (old_max - old_min)) + new_min)
}