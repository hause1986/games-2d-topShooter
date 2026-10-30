GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
	//TODO - вспомогательный для отображения границ коллизии
	this.collisionObjects = []
}

GHScene.prototype.sortObjects = function(){
	var objects = this.objects.slice().sort( function( a, b ){
		return ( a.lavel || 0 ) - ( b.lavel || 0 )
	} )
	this.objects = objects
}

GHScene.prototype.add = function( obj ){
	this.objects.push( obj )
}

//TODO - вспомогательный для отображения границ коллизии
GHScene.prototype.addCollision = function( obj ){
	this.collisionObjects = obj
}


//TODO
//пока не нужное
/*
GHScene.prototype.addCopy = function( obj ){
	var object = {}
	var image = obj.image	
	object = JSON.parse(
		JSON.stringify( obj )
	)
	object.image = image
	this.objects.push( object )
}
*/