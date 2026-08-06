Number.prototype.toRad = function () {	
	RAD = 0.017453292519943295
	return this * RAD
}

var getRandomInt = function getRandomInt( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}