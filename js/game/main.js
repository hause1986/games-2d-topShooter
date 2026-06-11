var GHGame = function(){
	this.status = {}
	this.config = {}	
}

GHGame.prototype.init = function( config ){
	this.config = config //созраняем весь конфиг
	var display = config.display
	var player = config.player
	
	var canvas = document.createElement( 'canvas' )
    canvas.id = 'gameCanvas'
	canvas.width = display.width()
	canvas.height = display.height()	
    
    // Очищаем display и добавляем канвас
    display.html( '' )  // очищаем содержимое
    display.append( canvas )
	
	//для добавления ольектов в сцену
	var object = new GHObject()
	
	var objPlayer = object.player({
		name : player.name,
		position: {
			x: 50,
			y: 50,
		},
		angle: 60,
	})
	
	//создание сцены
	var scene = new GHScene( canvas )
	
	//добавляем персонажа
	scene.addObj( objPlayer )
	
	//отрисовка
	var renderer = new GHRenderer( scene )
	
	//this.ctx = canvas.getContext('2d')

	//игровой цикл
	var loop = new GHGameLoop()
	loop.start( function frame() {
		//renderer.update()
		renderer.render()
	} )	

	console.log( this )
	console.log( scene )
}

//статистика
GHGame.prototype.getStatus = function(){
	return this.status
}


//сброс всех настроек и статистики
GHGame.prototype.clear = function(){
	
}