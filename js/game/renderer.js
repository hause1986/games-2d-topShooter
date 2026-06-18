var GHRenderer = function( scene ){	
	this.scene = scene
	this.ctx = scene.canvas.getContext( '2d' )
}

GHRenderer.prototype.render = function( obj ){
	this.clearCanvas()
	this.draw()	
	//this.editCanvas()	
}


GHRenderer.prototype.clearCanvas = function(  ){
	//this.scene
}

GHRenderer.prototype.draw = function(  ){

}
GHRenderer.prototype.editCanvas = function(  ){

}

