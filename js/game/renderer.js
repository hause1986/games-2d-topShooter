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
		console.log( object )
		ctx.save()
		if( object.type == 'player' ){}
		
		var pointersObject = this.getPointers(
			object.position,
			object.size
		)
		
		ctx.strokeStyle = object.color
		ctx.lineWidth = 1
		ctx.fillStyle = object.color
		//ctx.beginPath()		
		ctx.strokeRect(
			pointersObject.x,
			pointersObject.y,
			object.size,
			object.size
		)
		ctx.fillRect(
			object.position.x,
			object.position.y,
			1,
			1
		)
		//ctx.stroke()
		ctx.restore()
	}
	
}

//для получения точек для рисования квадратов
GHRenderer.prototype.getPointers = function( pointer, size ){
	var halfSize  = size / 2
	var x = pointer.x - halfSize
	var y = pointer.y - halfSize
	
	return {
		x : x,
		y : y,
	}
}