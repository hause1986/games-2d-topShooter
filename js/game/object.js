var GHObject = function(){
	this.size = 50
	this.textute = null
	
}

GHObject.prototype.init = function(){
	this.initTexture()
}

GHObject.prototype.initTexture = function(){
	this.textute = {
		player : './js/game/img/player.png',
		concrete : '',
		brick : '',
		grass : '',
		water : '',		
	}
}

GHObject.prototype.object = function( obj ){
	return {
		name : obj.name,
		position : obj.position,
		angle : obj.angle,
		size : this.size
	}	
}

GHObject.prototype.player = function( obj ){
	var obj = this.object( obj )
	
	obj.type = 'player'
	obj.textute = this.textute.player
	obj.color = '#f4a460'
	return obj
}

GHObject.prototype.concrete = function(){
	// бетон 
	// пули ударяются
	// не пробить
	// не проехать	
}

GHObject.prototype.brick = function(){
	// кирпич 
	// пули ударяются
	// пробить
	// не проехать
}

GHObject.prototype.grass = function(){
	// трава
	// пули не ударяются
	// не пробить 
	// проезать по низу	
}

GHObject.prototype.water = function(){
	// трава
	// пули не ударяются
	// не пробить 
	// не проехать	
}



