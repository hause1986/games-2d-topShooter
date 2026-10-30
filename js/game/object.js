var GHObject = function(){	
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

GHObject.prototype.objectCopy = function( obj ){
	var object = {}
	object = JSON.parse(
		JSON.stringify( obj )
	)
	return object
}

GHObject.prototype.player = function( obj ){	
	//var obj = this.object( obj )	
	obj.type = 'player'	
	obj.color = '#f4a460'
	obj.image = this.loadedTextures.player
	obj.lavel = 2
	obj.collision = {
		type	: 'circle',
		radius	: 30,
	}
	return obj
}

GHObject.prototype.concrete = function( obj ){
	// бетон 
	// пули ударяются
	// не пробить
	// не проехать
	obj.type = 'concrete'
	obj.color = '#cccccc'
	obj.image = this.loadedTextures[obj.type]
	obj.lavel = 3
	obj.collision = {
		type	: 'rect',
		width	: 70,
		height	: 70,
	}
	return obj	
}

GHObject.prototype.brick = function( obj ){
	// кирпич 
	// пули ударяются
	// пробить
	// не проехать
	obj.type = 'brick'
	obj.color = '#ff6347'
	obj.image = this.loadedTextures[obj.type]
	obj.lavel = 3
	obj.collision = {
		type	: 'rect',
		width	: 70,
		height	: 70,
	}
	return obj		
}

GHObject.prototype.grass = function( obj ){
	// трава
	// пули не ударяются
	// не пробить 
	// проезать по низу
	obj.type = 'grass'
	obj.color = '#008000'
	obj.image = this.loadedTextures[obj.type]
	obj.lavel = 1
	return obj		
}

GHObject.prototype.water = function( obj ){
	// трава
	// пули не ударяются
	// не пробить 
	// не проехать
	obj.type = 'water'
	obj.color = '#4682b4'
	obj.image = this.loadedTextures[obj.type]
	obj.lavel = 1
	return obj	
}