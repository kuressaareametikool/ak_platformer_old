// Passing joystick commands from server to client
var socket = io.connect();

socket.on('message', function (data)
{
	jaws.socket = data.key
});


// Main game function

function playState()
{

	this.setup = function ()
	{

		// Viewport

		viewport = new jaws.Viewport(
		{
			max_x: 4000,
			max_y: 4000
		})

		// Level map

		var level = {
			width: 12,
			map: [

			1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1,
			5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
			5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 4,
			5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
			1, 3, 3, 0, 0, 0, 3, 0, 0, 3, 1, 1,
			5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
			5, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4,
			5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
			1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

			]
		}

		// Viewport

		viewport = new jaws.Viewport(
		{
			max_x: 4000,
			max_y: 4000
		})

		// Map elements

		var elements = {
			0: {},
			1: {
				'image': 'images/uued/dirt.png',
				'layer': 'walls'
			},
			3: {
				'image': 'images/uued/tiledirt.png',
				'layer': 'walls'
			},
			4: {
				'image': 'images/uued/tilegrassleft.png',
				'layer': 'walls'
			},
			5: {
				'image': 'images/uued/tilegrassright.png',
				'layer': 'walls'
			},
			6: {
				'image': 'images/uued/dirt.png',
				'layer': 'walls'
			},
			7: {
				'image': 'images/uued/tilegrassbot.png',
				'layer': 'walls'
			},
			2: {
				'image': 'images/gray.png',
				'layer': 'items'
			}
		}
		// Tilemap

		walls = new jaws.TileMap(
		{
			size: [100, 100],
			cell_size: [40, 40]
		})
		items = new jaws.TileMap(
		{
			size: [100, 100],
			cell_size: [40, 40]
		})

		// Filling tilemap

		var rows = level.map.length / level.width

		for (var i = 0; i < rows; i++)
		{
			for (var j = 0; j < level.width; j++)
			{
				var el = (i * level.width) + j
				var x = j * 40
				var y = i * 40
				if (elements[level.map[el]].image)
				{
					var tile = new jaws.Sprite(
					{
						image: elements[level.map[el]].image,
						x: x,
						y: y,
						type: elements[level.map[el]].type
					})
					this[elements[level.map[el]].layer].pushToCell(j, i, tile)
				}
			};
		};

		// Player

		this.player = new jaws.Sprite(
		{
			image: "images/red.png",
			x: 70,
			y: 60,
			anchor: "center"
		})

		player.vx = 0
		player.vy = 0
		player.canJump = false;

		player.move = function ()
		{
			this.x = this.x + this.vx
			if (walls.atRect(player.rect()).length > 0)
			{
				this.x = this.x - this.vx
			}
			this.vx = 0

			if (this.vy < 0) this.vy = -1;

			this.y = this.y + this.vy
			if (walls.atRect(player.rect()).length > 0)
			{
				player.canJump = true;
				this.y = this.y - this.vy
			}
			this.vy = 0

		}

	}

	this.update = function ()
	{

		// Looking for keyboard or joystick presses

		if (jaws.pressed("left") || jaws.socket == 'left')
		{
			player.vx = -5
		}
		if (jaws.pressed("right") || jaws.socket == 'right')
		{
			player.vx = 5;
		}
		if (jaws.pressed("up") || jaws.socket == 'up')
		{
			
			
				player.vy = -15
		}
		if (jaws.pressed("down") || jaws.socket == 'down')
		{
			player.vy = 5;
		}
		jaws.socket = null

		// If nothing pressed, add some gravity to player

		player.vy = player.vy + 5
		player.move()

		viewport.centerAround(player)

	}

	this.draw = function ()
	{
		jaws.clear()

		viewport.apply(function ()
		{

			walls.all().forEach(function (tile)
			{
				tile.draw()
			})
			items.all().forEach(function (tile)
			{
				tile.draw()
			})
			player.draw()

		})
	}
}

jaws.start(playState())