$count = 15;
len = 1;

$(document).ready(function() {
	var $container = $("div.container");
	var $row = $("<div class='row'></div>");
	var $cell = $("<div class='cell'></div>");
	var $rowItem;
	var $cellItem;
	for (var i = 0; i < $count; i++) {
		$rowItem = $row.clone();
		$container.append($rowItem);
		for (var j = 0; j < $count; j++) {
			$cellItem = $cell.clone();
			$rowItem.append($cellItem);
			if (i === 0 && j < len)
				$cellItem.addClass("snake");
		}
	}

	var keys = [13, 32, 37, 38, 39, 40];
	$("body").on("keydown", function(event) {
		var pressedKey = event.keyCode;
		if (keys.indexOf(pressedKey) < 0)
			return;
		switch(pressedKey) {
			case 13:
				startGame();
				break;
			case 32:
				pauseGame();
				break;
			case 37:
				direction = 2;
				break;
			case 38:
				direction = 3;
				break;
			case 39:
				direction = 0;
				break;
			case 40:
				direction = 1;
		}
	});

	$("#close").on("click", function() {
		$("#alert").hide();
	});
});

function startGame() {
	posI = 0;
	posJ = 0;
	len = 1;
	$(".scores").text(len);
	coorI = [0];
	coorJ = [0];
	direction = 0;
	startSnake();
}

function startSnake() {
	clearInts();
	newFood();
	food = setInterval(newFood, 20000);
	game = setInterval(snakeGo, 300);
}

function snakeGo() {
	if (direction === 0)
		posI++;
	else if (direction === 1)
		posJ++;
	else if (direction === 2)
		posI--;
	else if (direction === 3)
		posJ--; 
	var condSnake = $(".row").eq(posJ).find(".cell").eq(posI)
		            .hasClass("snake");
	if (posI < 0 || posI === $count || posJ < 0 || posJ === $count 
	    || condSnake)
		stopGame();
	else {
		$(".cell").removeClass("snake");
		cond = $(".row").eq(posJ).find(".cell").eq(posI)
		       .hasClass("food");
		if (cond) {
			coorI.push(coorI[len-1]);
			coorJ.push(coorJ[len-1]);
			$(".row").eq(coorJ[len]).find(".cell").eq(coorI[len])
			.addClass("snake");
		}
		for (var i = len - 1; i >= 0; i--) {
			if (i) {
				coorI[i] = coorI[i - 1];
				coorJ[i] = coorJ[i - 1];
			} else {
				coorI[0] = posI;
				coorJ[0] = posJ;
			}
			$(".row").eq(coorJ[i]).find(".cell").eq(coorI[i])
			.addClass("snake");
		}
		if (cond)  {
			len++;
			$(".scores").text(len);
			startSnake();
		}
	}
}

function stopGame() {
	clearInts();
	$(".cell").removeClass("snake").removeClass("food");
	$("#result").text(len);
	$("#alert").show();
}

function newFood() {
	$(".cell").removeClass("food");
	var newX = Math.floor(Math.random() * $count);
	var newY = Math.floor(Math.random() * $count);
	$(".row").eq(newY).find(".cell").eq(newX).addClass("food");
}

function clearInts() {
	if (typeof game != 'undefined') {
		clearInterval(game);
		delete game;
	}
	if (typeof food != 'undefined') {
		clearInterval(food);
		delete food;
	}
}

function pauseGame() {
	if (typeof game != 'undefined') {
		clearInts();
	}
	else { 
		startSnake();
	}
} 