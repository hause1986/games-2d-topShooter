var GHGameLoop = function( spead ) {
	this.spead = ( spead * 1000 ) || 1000
	this.frame = this.frame.bind( this )
	this.lastTime = 0
	this.callback = function() {}
	this.status = true
}

GHGameLoop.prototype.getStatus = function() {
	return this.status
}

GHGameLoop.prototype.setStatus = function( status ) {
	this.status = status
}

GHGameLoop.prototype.start = function( callback ) {
	this.callback = callback
	requestAnimationFrame( this.frame )
}

GHGameLoop.prototype.frame = function( time ) {	
	var seconds = ( time - this.lastTime ) / this.spead
	if( seconds > 0.001 && this.status ){
		this.lastTime = time
		this.callback( seconds )
	}	
	requestAnimationFrame( this.frame )
}