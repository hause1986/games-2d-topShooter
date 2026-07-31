var GHGame = function(){
	this.config = {		
		player: {
			name: 'Стрелок',
			position: {
				x: 50,
				y: 50,
			},
			angle: 150,
			speed: 5,
		}
		
	}
	
	this.display = null
	this.canvas = null
	this.player = {}
	this.status = {}
}

GHGame.prototype.init = function( display ){
	this.display = display
	this.initDisplay( )
	this.initPlayer()
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


GHGame.prototype.start = function(  ){
	var self = this
	var canvas = self.canvas
	var display = self.display

	canvas.width = display.width()
	canvas.height = display.height()	

	//для добавления обьектов в сцену
	var object = new GHObject()
	object.init()
	
	//загружаем все текстуры
	object.loadTextures( function(){
		//как только загрузили текстуры загружаем обьекты
			
		// добавляем данные в обьект ( создаем обьект Персонаж )
		var objPlayer = object.player( {
			name : self.player.name,
			position: {
				x: self.player.position.x,
				y: self.player.position.y,
			},
			angle: self.player.angle,
		} )
		
		//создание сцены
		var scene = new GHScene( canvas	)
		
		//добавляем персонажа
		scene.add( objPlayer )
		
		//отрисовка
		var renderer = new GHRenderer( scene )
		
		renderer.render()

		//игровой цикл
		/*
		var loop = new GHGameLoop( 6000 )
		loop.start( function frame() {		
			renderer.render()
		} )
		*/		
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