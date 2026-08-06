var GHRenderer = function( scene, size ){
	this.canvas = scene.canvas
	this.objects = scene.objects
	this.ctx = this.canvas.getContext( '2d' )
	this.size = size
	this.halfSize  = size / 2
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
	var size = 0
	var halfSize = -this.halfSize
	
	var sortObjects = this.objects.slice().sort( function( a, b ){
		return ( a.lavel || 0 ) - ( b.lavel || 0 )
	} )
	
	for( var object of sortObjects ){
		ctx.save()
		
		if( object === null ){
			continue
		}
		size = this.size
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
			//size *= 0.8 
		}		
		
		var image = object.image		
		if(
				image
			&&	image.complete
			&&	image.naturalWidth > 0
		){
			//3. Рисуем обьект как бы от начало координат НО в той координате которая реально
			ctx.drawImage(
				image,
				halfSize,
				halfSize,
				size,
				size
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