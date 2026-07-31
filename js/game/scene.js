GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
}

GHScene.prototype.addCopy = function( obj ){
	var object = {}
	var image = obj.image	
	object = JSON.parse(
		JSON.stringify( obj )
	)
	object.image = image
	this.objects.push( object )
}

GHScene.prototype.add = function( obj ){
	this.objects.push( obj )
}