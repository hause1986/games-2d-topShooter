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

// 
GHCollision.prototype.getBounds = function( obj ){
    var collision = obj.collision
    var position = obj.position

    if( collision.type == 'circle' ){
		return {
			type	: collision.type,
			x		: position.x,
			y		: position.y,
			radius	: collision.radius,			
		}
    }else if( collision.type == 'rect' ){
		return {
			type	: collision.type,
			x		: position.x,
			y		: position.y,
			width	: collision.width,
			height	: collision.height,
		}
	}
}