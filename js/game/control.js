var GHControl = function( object ){
	this.object = object	
	this.codes  = {
		87: 'w',
		83: 's',
		
		65: 'a',
		68: 'd',
		
		32: 'sp',
	}
	this.states = {}
	this.flag = false
	document.addEventListener( 'keydown', this.onKey.bind( this, true ), false )
	document.addEventListener( 'keyup',	this.onKey.bind( this, false ),	false )
}

GHControl.prototype.onKey = function( flag, e ) {
	var state = this.codes[e.keyCode]
	if ( typeof state === 'undefined' )
		return
	this.states[state] = flag
	this.flag = flag
	e.preventDefault && e.preventDefault()
	e.stopPropagation && e.stopPropagation()
}

GHControl.prototype.update = function(){	
	var speed = this.object.speed
	var angle = this.object.angle	
	var position = this.object.position
	var states = this.states
	
	var cos = sin = 0
	if(
			states.w
		||	states.s
		||	states.a
		||	states.d
	){
		
		if(
				states.w 
			||	states.s
		){
			cos = Math.cos( angle.toRad() )
			sin = Math.sin( angle.toRad() )
			
			if( states.w ){
				position.x += speed * sin
				position.y -= speed * cos
			}
			
			if( states.s ){
				position.x -= speed * sin
				position.y += speed * cos
			}	
		}
		
		if(
				states.a
			||	states.d
		){			
			if( states.a ){			
				angle -= 2
			}
			if( states.d ){
				angle += 2
			}
			
			if( angle > 360 ){
				angle = 0
			}else if( angle < 0 ){
				angle = 360
			}
			
		}		
	}
	
	if( states.sp ){
		states = {
			'sp' : false
		}
	}
	if( this.flag ){
		this.object.position = {
			x : position.x,
			y : position.y
		}
		this.object.angle = angle
	}
	
}