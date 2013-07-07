"use strict";
(function initGame(){
	var elements = Array.prototype.slice.call(document.getElementsByTagName("td"));
	elements.forEach(function(element){
		element.addEventListener('click', function(){
			ttt.game.emit({ type:'played' + ttt.checkGameState().player, data: { boardPosition: this.id } });
			refreshGame();
		});
	});
	
	refreshGame();
})();

function refreshGame(){
	var gameState = ttt.checkGameState();
	resetBoard();
	redrawBoard(gameState);
	reviewGame(gameState);
};

function reviewGame(gameState){
	if((gameState.situation === "WON" || gameState.situation === "DRAW") 
		&& confirm("New game?")) {
		ttt.game.emit({type:'reseted', data: {}});
		refreshGame();
	};
};

function resetBoard(){
	var elements = Array.prototype.slice.call(document.getElementsByTagName("td"));
	elements.forEach(function(element){
		element.innerText = "";
	});
	document.getElementById("situation").innerText = "";
	document.getElementById("round").innerText = "";
	document.getElementById("player").innerText = "";
};

function redrawBoard(gameState){
	document.getElementById("situation").innerText = gameState.situation;
	document.getElementById("round").innerText = gameState.round;
	document.getElementById("player").innerText = gameState.player;

	gameState.turnX.forEach(function(item){
		document.getElementById(item).innerText = "X";
	});
	gameState.turnO.forEach(function(item){
		document.getElementById(item).innerText = "O";
	});
};