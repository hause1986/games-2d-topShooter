GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
}

GHScene.prototype.addPlayer = function( obj ){
	this.objects.push( JSON.parse( JSON.stringify( obj ) ) )
}




//
GHScene.prototype.addObj = function( obj ){
	this.objects.push( JSON.parse( JSON.stringify( obj ) ) )
}