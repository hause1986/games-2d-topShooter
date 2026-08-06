var GHRenderer = function( scene, size ){
	this.canvas = scene.canvas
	this.objects = scene.objects
	this.ctx = this.canvas.getContext( '2d' )
	this.size = size
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
		
		if( object === null ){
			continue
		}
		
		// для обьектов которые представлены в матричном виде делаем перерасчет			
		var pixel = this.getPointers( object.position )
		//ставим начало координат в новую точку
		ctx.translate(
			pixel.x,
			pixel.y
		)
		
		if( object.type == 'player' ){			
			var angle = object.angle
			//делаем поворот относительно новой системы координат
			ctx.rotate( angle.toRad() )
		}		
		
		var image = object.image		
		if(
				image
			&&	image.complete
			&&	image.naturalWidth > 0
		){
			var scale = object.scale || 1			
			var scaledSize = size * scale
			var scaledHalfSize = scaledSize / 2
			
			// Рисуем обьект как бы от начало координат НО в той координате которая реально
			ctx.drawImage(
				image,
				-scaledHalfSize,
				-scaledHalfSize,
				scaledSize,
				scaledSize
			)
		}
		ctx.restore()
	}	
}

//для получения точек для рисования квадратов
GHRenderer.prototype.getPointers = function( position ){
	var size = this.size
	var x = position.x * size + size / 2
	var y = position.y * size + size / 2

	return {
		x : x,
		y : y,
	}
}

// вспомогательная сетка
GHRenderer.prototype.drawGrid = function(){	
	var step = this.size
	var ctx = this.ctx    
	var i = this.size
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