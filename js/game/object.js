var GHObject = function(){
	this.size = {
		width: 20,
		height: 20,
	}
	this.textute = null
	
}

GHObject.prototype.init = function(){
	initTexture()
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


GHObject.prototype.player = function( obj ){
	return {
		name : obj.name,
		textute : this.textute.player,
		position: obj.position,
		angle: obj.angle,
	}
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



