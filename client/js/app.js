var socket = io.connect();

socket.on('message', function (data) {
  jaws.socket = data.key
});

function setup() {
   player = new jaws.Sprite({image: "images/plane.png", x: jaws.width/2, y:jaws.height/2, anchor: "center"})
 }

 function update() {
   if(jaws.pressed("left") || jaws.socket == 'left')  { player.x -= 2 }
   if(jaws.pressed("right") || jaws.socket == 'right') { player.x += 2; }
   if(jaws.pressed("up") || jaws.socket == 'up') { player.y -= 2 }
   if(jaws.pressed("down") || jaws.socket == 'down') { player.y += 2 }
   jaws.socket = null
 }

 function draw() {
   jaws.clear()
   player.draw()
 }

 jaws.start()
 