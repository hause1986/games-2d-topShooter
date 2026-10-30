var GHCollision = function( size ){
	this.objects = []
	this.size = size || 50
}

GHCollision.prototype.add = function( obj ){
	if( obj.collision == true ){
		this.objects.push( obj )
	}
}

GHCollision.prototype.clear = function() {
    this.objects = []
};