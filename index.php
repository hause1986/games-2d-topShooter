<?
$CASH = '?we=' . time();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Graff Hause</title>
		<meta name='viewport' content='width=device-width, initial-scale=1.0'>
		<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
		<link type='image/x-icon' rel='shortcut icon'  href='./img/favicon.ico' />

		<script type='text/javascript' src='./js/class.ghdom.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/class.ghinterface.js<?=$CASH?>'></script>		
		
		<script type='text/javascript' src='./js/game/gameloop.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/game/object.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/game/scene.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/game/renderer.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/game/main.js<?=$CASH?>'></script>
		<script type='text/javascript' src='./js/script.js<?=$CASH?>'></script>
		<link type='text/css' rel='stylesheet' href='./css/style.css<?=$CASH?>'>
	</head>

	<body>
	
		<div id='header' class='center'>Graff Hause</div>
		<div id='content'>
			<?//страница главного меню?>
			<div class='page active' data-id='menu'>			
				<div id='setPlayer' class='field'>Задать игрока</div>
				<div id='setMap' class='field'>Выбрать карту</div>
				<div id='display' class='field'>Начать игру</div>
				<div id='status' class='field'>Показать статистику</div>
				<div id='clear' class='field'>Сбросить все</div>
			</div>
			
			<?//страница установка параметров игрока?>
			<div class='page' data-id='set-player'>
				<div class='field center'>Настойка игрока</div>
				<a href='#' class='butt buttBackMenu'>Назад</a>
			</div>
			<?//страница выбора карты?>
			<div class='page' data-id='set-map'>
				<div class='field center'>Настойка карты</div>
				<a href='#' class='butt buttBackMenu'>Назад</a>
			</div>
			<?//страница игры?>	
			<div class='page' data-id='display'></div>
			<?//страница станистики?>
			<div class='page' data-id='status'>
				<div class='field center'>Статистика игрока</div>
				<div class='status-info'></div>
				<a href='#' class='butt buttBackMenu'>Назад</a>
			</div>
			
		</div>		
	</body>
</html>