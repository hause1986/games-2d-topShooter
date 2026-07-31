var GHObject = function(){
	this.size = 30
	this.texturePachs = null
	this.loadedTextures = null
}

GHObject.prototype.init = function(){
	this.initTexturePachs()
}

GHObject.prototype.initTexturePachs = function(){
	this.texturePachs = {
		player : './js/game/img/player.png',
		concrete : './js/game/img/concrete.png',
		brick : './js/game/img/brick.png',
		grass : './js/game/img/grass.png',
		water : './js/game/img/water.png',
	}
}

GHObject.prototype.loadTextures = function( callback ){
	var texturePachs = this.texturePachs
	var loadedTextures = {}
	var loaded = 0
	var total = Object.keys( texturePachs ).length
	
	console.log( total )
    
	for ( var key in texturePachs ) {
		
		var val = texturePachs[key]       
		var img = new Image()		
		
		img.onload = function(){			
			//вызываем калбек как только пробежим по всему циклу и загрузка закончена
			loaded++ //увеличиваем ТОлько после загрузки				
			if( loaded >= total ){
				callback()
				
			}
		}
		img.onerror  = function(){
			loaded++ //если есть ошибка - все равно увеличиваем
		}
		img.src = val
		loadedTextures[key] = img
		
    }	
	this.loadedTextures = loadedTextures
}

GHObject.prototype.object = function( obj ){
	var object = {}
	
	if( obj.angle ){
		object.angle = obj.angle
	}
	if( obj.name ){
		object.name = obj.name
	}
	
	object.position = obj.position
	object.size = this.size
	
	return object
}

GHObject.prototype.player = function( obj ){	
	var obj = this.object( obj )
	
	obj.type = 'player'	
	obj.color = '#f4a460'	
	obj.image = this.loadedTextures.player
	
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



