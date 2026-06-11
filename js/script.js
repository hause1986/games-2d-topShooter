var init = function(){		
	interfaceApp = new GHInterface()
	interfaceApp.init()	

}
var interfaceApp = null
document.addEventListener( 'DOMContentLoaded', function(){
	init()	
})