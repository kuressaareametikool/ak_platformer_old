
var socket = io.connect();

socket.on('message', function (data) {
  jaws.socket = data.key
});

function playState() {

this.setup = function() {
  
  // Viewport
  
  viewport = new jaws.Viewport({max_x: 3200, max_y: 3200})
  
  // Level map
  
  var level = {
    width: 10,
    map: [

  0,0,0,0,0,0,0,0,0,0,
  0,0,0,1,1,0,0,0,0,3,
  3,0,0,0,0,0,0,0,0,1,
  1,1,0,0,0,1,0,0,1,2,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,1,1,  
  2,2,2,2,2,2,2,2,2,2,  
  2,2,2,2,2,2,2,2,2,2  

  ]}

  // Map elements
  
  var elements = {
    0 : {
    },
    1 : {
      'image': 'images/earth_1.png',
      'layer': 'walls'
    },
    2 : {
      'image': 'images/earth_2.png',
      'layer': 'walls'
    },
    3 : {
      'image': 'images/mushroom.png',
      'layer': 'collectables'      
    }
  }
  
  // Tilemap
  
   walls = new jaws.TileMap({size: [100,100], cell_size: [32,32]})
   collectables = new jaws.TileMap({size: [100,100], cell_size: [32,32]})
  
  // Filling tilemap
  
   var rows = level.map.length / level.width

   for (var i=0; i < rows ; i++) {
     for (var j=0; j < level.width; j++) {
       var el = (i * level.width) + j
       var x = j * 32
       var y = i * 32
       if (elements[level.map[el]].image) {
         var tile = new jaws.Sprite({image: elements[level.map[el]].image, x: x, y: y, type: elements[level.map[el]].type})
         this[elements[level.map[el]].layer].pushToCell(j, i, tile)
        }
     };
   };
   
   // Player
   
   this.player = new jaws.Sprite({image: "images/cat.png", x: 70, y: 30, anchor: "center"})
   
   player.vx = 0
   player.vy = 0
   
   player.move = function() {
     this.x = this.x + this.vx
     if (walls.atRect(player.rect()).length > 0) { 
       this.x = this.x - this.vx 
      }
     this.vx = 0
     
     this.y = this.y + this.vy
     if (walls.atRect(player.rect()).length > 0) {
       this.y = this.y - this.vy 
     }
     this.vy = 0      
   
   }
   
 }

 this.update = function() {
   
   // Looking for keyboard or joystick presses
   
   if(jaws.pressed("left") || jaws.socket == 'left')  { player.vx = -2 }
   if(jaws.pressed("right") || jaws.socket == 'right') { player.vx = 2; }
   if(jaws.pressed("up") || jaws.socket == 'up') { player.vy = -6 }
   if(jaws.pressed("down") || jaws.socket == 'down') { player.vy = 2; }
   jaws.socket = null
   
   // If nothing pressed, add some gravity to player
   
   player.vy = player.vy + 3   
   player.move()
   
   viewport.centerAround(player)
   
 }

 this.draw = function() {
   jaws.clear()
   
   viewport.apply( function() {
          
     walls.all().forEach(function(tile) {
       tile.draw()
     })
     collectables.all().forEach(function(tile) {
       tile.draw()
     })
     player.draw()
  
  })
 }
}

jaws.start(playState())

