/*
0 ------------->x
 |
 |
 |
 |
 |
 y

*/
var GHGame = function(){
	this.display = null
	this.canvas = null
	this.player = {}
	this.map = {}
	this.status = {}
}

GHGame.prototype.init = function( display ){
	this.display = display
	this.initDisplay()
	this.initPlayer()
	this.initMap()
	this.initStatus()
}
	
GHGame.prototype.initDisplay = function(){
	var display = this.display
	display.html( '' )	
	var canvas = document.createElement( 'canvas' )
    canvas.id = 'gameCanvas'
    display.append( canvas )
	
	this.canvas = canvas
	this.display = display
}

GHGame.prototype.initPlayer = function(){
	this.player = {
		name: config.player.name,
		position: {
			x: config.player.position.x,
			y: config.player.position.y,
		},
		angle: config.player.angle,
		scale: config.player.scale,
		
		// из за того что я стал использовать матричные координаты
		// что бы скорость считалась корректно нужно ее поделить на размер ячейки
		speedPos: config.player.speedPos / config.size,
		speedRot: config.player.speedRot,
	}	
}

GHGame.prototype.initMap = function(){
	// пока это только для тестов - генерация карь
	// по идее сюда нужно сделать загрузку из существующих	
	var cols = 40 // getRandomInt( 10, 20 ) // строки
	var rows = 20 // getRandomInt( 10, 20 ) // столбики
	
	var setWall = function(  ){
		
		var max = 0
		for( var i = 0; i < configWalls.length; i++ ){
			max += configWalls[i].percent
		}
		
		var random = getRandomInt( 0, max )
		var cumulative = 0
		for( var i = 0; i < configWalls.length; i++ ){
			cumulative += configWalls[i].percent
			if( random <= cumulative ){
				return configWalls[i].type
			}
		}		
	}
	var configWalls = [
		//пустота
		{ type : 0, percent : 70 },
		//бетон
		{ type : 1, percent : 5 },
		//кирпич
		{ type : 2, percent : 20 },
		//трава
		{ type : 3, percent : 5 },
		//вода
		{ type : 4, percent : 5 },
	]
	
	var map = {
		size : {
			cols : cols,
			rows : rows,
			//пока не нужно
			//w : cols * config.size,
			//h : rows * config.size,
		},
	}
	var walls = []
	for( var j = 0; j < rows; j++ ){
		var row = []
		for( var i = 0; i < cols; i++ ){
			row.push( setWall() )
		}
		walls.push( row )
	}
	map.walls = walls
	this.map = map
}

GHGame.prototype.initStatus = function(){
	this.status = {
		name: config.player.name
	}	
}

GHGame.prototype.start = function(  ){
	var self = this
	var canvas = self.canvas
	var display = self.display

	canvas.width = display.width()
	canvas.height = display.height()	

	//для добавления обьектов в сцену
	var object = new GHObject()
	object.init()
	//создание сцены
	var scene = new GHScene( canvas	)	
	
	//загружаем все текстуры	
	object.loadTextures( function(){		
		//как только загрузили текстуры загружаем обьекты
		
		// Создаем систему коллизий
		var collision = new GHCollision( config.size )
			
		// добавляем данные в обьект ( создаем обьект Персонаж )
		var objPlayer = object.player( {
			name : self.player.name,
			position : {
				x : self.player.position.x,
				y : self.player.position.y,
			},
			angle : self.player.angle,
			scale : self.player.scale,
			speedPos : self.player.speedPos,
			speedRot : self.player.speedRot,			
		} )
		
		//добавляем персонажа в сцену
		scene.add( objPlayer )

		//добавляем персонажа в систему коллизий
		collision.add( objPlayer )
		
		//добавляем обьекты карты в цикле ( каждый обьект отдельно! )
		var map = self.map		
		for( var y = 0; y < map.size.rows; y++ ){
			for( var x = 0; x < map.size.cols; x++ ){
				var objWall = null
				var val = map.walls[y][x]
				
				if(
						self.player.position.x == x
					&&	self.player.position.y == y
				){
					continue
				}
				
				if( val == 0 ){
					continue
				}else if( val == 1 ){
					//бетон
					objWall = object.concrete( {
						position: {
							x: x,
							y: y,
						}
					} )
				}else if( val == 2 ){
					//кирпич
					objWall = object.brick( {
						position: {
							x: x,
							y: y,
						}
					} )
				}else if( val == 3 ){
					//трава
					objWall = object.grass( {
						position: {
							x: x,
							y: y,
						}
					} )
				}else if( val == 4 ){
					//вода
					objWall = object.water( {
						position: {
							x: x,
							y: y,
						}
					} )
				}
				scene.add( objWall )
				collision.add( objWall )
			}
		}
		
		//сортировка обьектов по уровням
		scene.sortObjects()
		
		//отрисовка
		var renderer = new GHRenderer(
			scene,
			config.size
		)
		
		//кем укравляем , с чем сталкиваемся
		var control = new GHControl( objPlayer, collision )	


		//игровой цикл		
		var loop = new GHGameLoop(  )
		loop.start( function frame() {
			control.update()			
			renderer.render()
		} )

			
	} )

}

GHGame.prototype.setPlayer = function( name ){
	if( name != '' ){
		this.player.name = name
		this.status.name = name
	}
}

//статистика
GHGame.prototype.getStatus = function(){
	return this.status
}


//сброс всех настроек и статистики
GHGame.prototype.clear = function(){
	this.initPlayer()
	this.initStatus()	
}