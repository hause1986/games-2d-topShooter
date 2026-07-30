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
		ctx.translate(
			object.position.x,
			object.position.y
		)
		if( object.type == 'player' ){
			// 2. Поворачиваем на нужный угол (в радианах!)
			var angle = object.angle || 0
			var angleRad = angle * Math.PI / 180
			ctx.rotate( angleRad )
			// 3. Рисуем танк (все координаты относительно центра)
			this.drawTank(ctx, object)
		}
		ctx.restore()
	}	
}


// Метод для рисования танка
GHRenderer.prototype.drawTank = function( ctx, object ){
    var size = object.size || 40
    var halfSize = size / 2
    
    // === КОРПУС ТАНКА ===
    ctx.save()
    
    // Основной корпус (прямоугольник)
    ctx.fillStyle = object.color || '#4CAF50'
    ctx.strokeStyle = '#2E7D32'
    ctx.lineWidth = 2
    
    // Корпус (чуть вытянутый)
    ctx.fillRect(-halfSize, -halfSize * 0.7, size, size * 0.6)
    ctx.strokeRect(-halfSize, -halfSize * 0.7, size, size * 0.6)
    
    // === БАШНЯ ТАНКА ===
    // Круглая башня
    ctx.fillStyle = object.towerColor || '#66BB6A'
    ctx.strokeStyle = '#2E7D32'
    ctx.lineWidth = 2
    
    ctx.beginPath()
    ctx.arc(0, 0, halfSize * 0.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    // === ДУЛО (ствол) ===
    ctx.save()
    ctx.fillStyle = '#1B5E20'
    ctx.strokeStyle = '#1B5E20'
    ctx.lineWidth = 3
    
    // Дулo направлено вверх (по умолчанию)
    ctx.fillRect(-3, -halfSize * 0.8, 6, halfSize * 0.6)
    ctx.strokeRect(-3, -halfSize * 0.8, 6, halfSize * 0.6)
    ctx.restore()
    
    // === ГУСЕНИЦЫ ===
    // Левая гусеница
    ctx.fillStyle = '#37474F'
    ctx.strokeStyle = '#263238'
    ctx.lineWidth = 1
    
    // Левая
    ctx.fillRect(-halfSize * 1.2, -halfSize * 0.8, halfSize * 0.3, size * 0.5)
    ctx.strokeRect(-halfSize * 1.2, -halfSize * 0.8, halfSize * 0.3, size * 0.5)
    
    // Правая гусеница
    ctx.fillRect(halfSize * 0.9, -halfSize * 0.8, halfSize * 0.3, size * 0.5)
    ctx.strokeRect(halfSize * 0.9, -halfSize * 0.8, halfSize * 0.3, size * 0.5)
    
    // === КОЛЕСА ===
    ctx.fillStyle = '#455A64'
    ctx.strokeStyle = '#263238'
    ctx.lineWidth = 1
    
    // Левое колесо
    ctx.beginPath()
    ctx.arc(-halfSize * 1.05, -halfSize * 0.55, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    // Правое колесо
    ctx.beginPath()
    ctx.arc(halfSize * 1.05, -halfSize * 0.55, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    ctx.restore()
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