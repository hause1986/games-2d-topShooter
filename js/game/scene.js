GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
}

GHScene.prototype.add = function( obj ){
	this.objects.push( JSON.parse( JSON.stringify( obj ) ) )
}