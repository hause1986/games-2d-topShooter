var GHInterface = function(){
	this.ui = null	
	this.game = new GHGame()	
}

GHInterface.prototype.init = function(){
	this.initUI()
	this.setupEvent()
	this.game.init( this.ui.pageDisplay )
}

GHInterface.prototype.initUI = function(){
	this.ui = {
		header: GHDom( '#header' ), // шапка
		
		//страници
		pageMain: GHDom( '.page[data-id=menu]' ),					//главное меню
		pageSetPlayer: GHDom( '.page[data-id=set-player]' ),		//настройки игрока
		pageSetMap: GHDom( '.page[data-id=set-map]' ),				//настройки карты
		pageDisplay: GHDom( '.page[data-id=display]' ),				//страничка игры
		pageStatus: GHDom( '.page[data-id=status]' ),				//статистика
		
		//пункты в меню
		setPlayer: GHDom( '.page[data-id=menu] #setPlayer' ),
		setMap: GHDom( '.page[data-id=menu] #setMap' ),
		display: GHDom( '.page[data-id=menu] #display' ),
		status: GHDom( '.page[data-id=menu] #status' ),
		clear: GHDom( '.page[data-id=menu] #clear' ),
		
		statusInfo: GHDom( '.status-info' ),
		
		//кнопка назад в главное меню
		back: GHDom( '.buttBackMenu' ),
		
		//элементы стр. настройки игрока
		setPlayerVal: GHDom( '#set-player-val' ),
		setPlayerButt: GHDom( '#set-player-butt' ),
		
	}
}

//прячем активную страничку
GHInterface.prototype.hidePage = function( e ){
	e.preventDefault()
	GHDom( '.page.active' ).removeClass( 'active' )
}

//установка событий
GHInterface.prototype.setupEvent = function(){
	var self = this
	var ui = this.ui
	
	//клик на заголовок для перезагрузки страници
	ui.header.on( 'click', function(){		
		var url = window.location.href.split('?')[0]		
		var cacheBuster = new Date().getTime()
		var urlNew = `${url}?cach=${cacheBuster}`
		window.location.href = urlNew
	} )
	
	//клик на кнопку назад в меню
	ui.back.on( 'click', function( e ){
		self.hidePage( e )
		ui.pageMain.addClass( 'active' )
	} )
	

	//клик на пункт меню [настройки игрока]
	ui.setPlayer.on( 'click', function( e ){
		self.hidePage( e )
		ui.pageSetPlayer.addClass( 'active' )
	} )
	
	//Сохраняем настройки игрока
	ui.setPlayerButt.on( 'click', function( e ){
		e.preventDefault()
		if( ui.setPlayerVal.val() != ''  ){
			self.game.setPlayer( ui.setPlayerVal.val() )
		}
	} )
	
	//клик на пункт меню [настройки карты]
	ui.setMap.on( 'click', function( e ){
		self.hidePage( e )
		ui.pageSetMap.addClass( 'active' )
	} )	
	
	//клик на пункт меню [страничка игры]
	ui.display.on( 'click', function( e ){
		self.hidePage( e )
		ui.pageDisplay.addClass( 'active' )
		self.game.start( ui.pageDisplay )
	} )
	
	//клик на пункт меню [статистика]
	ui.status.on( 'click', function( e ){
		self.hidePage( e )
		ui.pageStatus.addClass( 'active' )		
		ui.statusInfo.html( JSON.stringify( self.game.status, null, 2 ) )
	} )
	
	//клик на пункт меню [сброс статистики]
	ui.clear.on( 'click', function( e ){
		e.preventDefault()
		self.game.clear()
	} )
	
}