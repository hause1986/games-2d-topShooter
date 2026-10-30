var GHCollision = function(){
	this.objects = []	
}

GHCollision.prototype.add = function( obj ){
    if( obj.collision && typeof obj.collision === 'object' ){
        this.objects.push( obj )
    }
}

GHCollision.prototype.get = function(){
	return this.objects
}

GHCollision.prototype.clear = function() {
    this.objects = []
}

// получить AABB объекта в матричных координатах
/*
GHCollision.prototype.getBounds = function( obj ){
    var c = obj.collision
    var p = obj.position

    if( c.radius ){  // круглая (игрок)
        return {
            type	: 'circle',
            x		: p.x, 
			y		: p.y,
            r		: c.radius,
        }
    }
    // по умолчанию клетка 1×1 с центром в (x, y)
    return {
        type	: 'rect',
        x		: p.x - 0.5, 
		y		: p.y - 0.5,
        w		: 1, 
		h		: 1,
    }
}
*/

