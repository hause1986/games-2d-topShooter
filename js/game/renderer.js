var GHRenderer = function( scene ){
	this.canvas = scene.canvas
	this.objects = scene.objects
	this.ctx = this.canvas.getContext( '2d' )
	this.size = 50
}

GHRenderer.prototype.render = function( obj ){
	this.clearCanvas()
	this.drawGrid() // вспомогательная сетка
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
	var size = this.size
	
	for( var object of this.objects ){
		ctx.save()
		if( object.type == 'player' ){			
			// 1. центрируем обьект		
	
			ctx.translate(
				object.position.x,
				object.position.y
			)
			var angle = object.angle
			ctx.rotate( angle.toRad() )			
		}
		// 3. Рисуем (все координаты относительно центра)
		var newPosition = this.getPointers( object.position )
		var image = object.image		
		if(
				image
			&&	image.complete
			&&	image.naturalWidth > 0
		){
			ctx.drawImage(
				image,
				newPosition.x,
				newPosition.y,
				size,
				size
			)
		}
		ctx.restore()
	}	
}


//для получения точек для рисования квадратов
GHRenderer.prototype.getPointers = function( pointer ){
	var halfSize  = this.size / 2
	var x = -halfSize
	var y = -halfSize
	
	return {
		x : x,
		y : y,
	}
}

// вспомогательная сетка
GHRenderer.prototype.drawGrid = function(){	
	var step = this.size
	var ctx = this.ctx    
	var i = this.size / 2	
	var width = this.canvas.width
    var height = this.canvas.height	
	
	ctx.save()
	ctx.strokeStyle = '#51518f'
	ctx.lineWidth = '1'
	
	
	
	for( var x = i; x <= width; x += step ){
        ctx.beginPath()
        ctx.moveTo( x, 0 )
        ctx.lineTo( x, height )
        ctx.stroke()
	}
	for( var y = i; y <= height; y += step ){
        ctx.beginPath()
        ctx.moveTo( 0, y )
        ctx.lineTo( width, y )
        ctx.stroke()
	}	
	
	ctx.restore()
}