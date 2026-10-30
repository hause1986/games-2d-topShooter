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
/*
GHCollision.prototype.getBounds = function( obj ){
    var collision = obj.collision
    var position = obj.position

    if( collision.type == 'circle' ){
		var radius = collision.radius * ( this.size / 2 )
		return {
			type	: collision.type,
			x		: position.x,
			y		: position.y,
			radius	: radius,			
		}
    }else if( collision.type == 'rect' ){
			var pw = collision.width * this.size
			var ph = collision.height * this.size
			var px = pixel.x - pw / 2
			var py = pixel.y - ph / 2
		
		
		return {
			type	: collision.type,
			x		: position.x,
			y		: position.y,
			width	: collision.width,
			height	: collision.height,
		}
	}
}
*/