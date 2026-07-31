var GHRenderer = function( scene ){
	this.canvas = scene.canvas
	this.objects = scene.objects
	this.ctx = this.canvas.getContext( '2d' )
}

GHRenderer.prototype.render = function( obj ){
	this.clearCanvas()
	this.draw()
}


GHRenderer.prototype.clearCanvas = function(  ){
	var canvas = new GHDom( this.canvas )	
	this.ctx.clearRect(
		0,
		0,
		canvas.width(),
		canvas.height()
	)
}

GHRenderer.prototype.draw = function(  ){
	var ctx = this.ctx
	
	for( var object of this.objects ){		
		ctx.save()
		if( object.type == 'player' ){
			// 1. центрируем обьект
			ctx.translate(
				object.position.x,
				object.position.y
			)
			// 2. Поворачиваем на нужный угол (в радианах!)
			var angle = object.angle || 0
			var angleRad = angle * Math.PI / 180
			ctx.rotate( angleRad )
			
		}
		// 3. Рисуем (все координаты относительно центра)
		var newPosition = this.getPointers(
			object.position,
			object.size
		)
		var image = object.image
		
		if(
				image
			&&	image.complete
			&&	image.naturalWidth > 0
		){
			console.log( object )
			
			ctx.drawImage(
				image,
				newPosition.x,
				newPosition.y,
				object.size,
				object.size
			)
		}
		ctx.restore()
	}	
}


//для получения точек для рисования квадратов
//центрируем
GHRenderer.prototype.getPointersCENTER = function( pointer, size ){
	var halfSize  = size / 2
	var x = pointer.x - halfSize
	var y = pointer.y - halfSize
	
	return {
		x : x,
		y : y,
	}
}

GHRenderer.prototype.getPointers = function( pointer, size ){
	var halfSize  = size / 2
	var x = -halfSize
	var y = -halfSize
	
	return {
		x : x,
		y : y,
	}
}