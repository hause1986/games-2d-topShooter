var GHGame = function(){
	this.config = {
		player: {
			name: 'Стрелок',
			position: {
				x: 50,
				y: 50,
			},
			angle: 60,
		}
		
	}
	
	this.display = null
	this.canvas = null
	this.player = {}
	this.status = {}
}

GHGame.prototype.init = function( display ){
	this.initDisplay( display )
	this.initPlayer()
	this.initStatus()
}
	
GHGame.prototype.initDisplay = function( display ){	
	this.display = display
	var canvas = document.createElement( 'canvas' )
    canvas.id = 'gameCanvas'
	canvas.width = display.width()
	canvas.height = display.height()	
    
    // Очищаем display и добавляем канвас
    display.html( '' )  // очищаем содержимое
    display.append( canvas )
	this.canvas = canvas
}

GHGame.prototype.initPlayer = function(){
	this.player = {
		name: this.config.player.name,
		position: {
			x: this.config.player.position.x,
			y: this.config.player.position.y,
		},
		angle: this.config.player.angle,
	}	
}

GHGame.prototype.initStatus = function(){
	this.status = {
		name: this.config.player.name
	}	
}


GHGame.prototype.start = function(){
	//для добавления ольектов в сцену
	var object = new GHObject()
	object.init()
	
	var objPlayer = object.player({
		name : this.player.name,
		position: {
			x: this.player.position.x,
			y: this.player.position.y,
		},
		angle: this.player.position.angle,
	})
	
	//создание сцены
	var scene = new GHScene( this.canvas )
	
	//добавляем персонажа
	scene.add( objPlayer )
	
	//отрисовка
	var renderer = new GHRenderer( scene )
	

	//игровой цикл
	var loop = new GHGameLoop()
	loop.start( function frame() {
		//renderer.update()
		renderer.render()
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