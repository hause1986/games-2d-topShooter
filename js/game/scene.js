GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
}

GHScene.prototype.add = function( obj ){
	//TODO - временно
	this.objects.push( JSON.parse( JSON.stringify( obj ) ) )
}