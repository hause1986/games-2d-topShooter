GHScene = function( canvas ){
	this.canvas = canvas
	this.objects = []
}

GHScene.prototype.add = function( obj ){
	var object = {}
	
	object.type = obj.type
	object.color = obj.color
	object.image = obj.image	
	object.position = obj.position
	object.size = obj.size
	
	if( obj.name ){
		object.name = obj.name
	}
	if( obj.angle ){
		object.angle = obj.angle
	}
	
	this.objects.push( object )
}