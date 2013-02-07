var fs = require('fs');

var tako = require('tako')
var app = tako()

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

app.sockets.on('connection', function (socket) {

var joystick = new (require('joystick'))(0, 3500, 350);

var freq = 10
var x = null
var y = null

var joystick = new (require('joystick'))(0, 3500, 350);

joystick.on('axis', function(data){

  if (data.number == 0 && data.value == -32767) {
    x = 'left'
  } 
  if (data.number == 0 && data.value == 32767) {
    x = 'right'
  } 
  if (data.number == 0 && data.value == 0) {
    x = null
  } 
  if (data.number == 1 && data.value == -32767) {
    y = 'up'
  } 
  if (data.number == 1 && data.value == 32767) {
    y = 'down'
  } 
  if (data.number == 1 && data.value == 0) {
    y = null
  } 

})

var poll = setInterval(function() {
  if (x) app.sockets.emit('message', { key: x}) 
  if (y) app.sockets.emit('message', { key: y}) 
}, freq)

})
