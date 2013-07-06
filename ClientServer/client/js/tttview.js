"use strict";
var checkGameState = function() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'http://localhost:9001/status', false);
	xmlhttp.send(null);
	if(xmlhttp.status == 200) {
		return JSON.parse(xmlhttp.responseText);
	}
};

var game = {
	emit: function(event){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", 'http://localhost:9001/emit', false);
		xmlhttp.send(JSON.stringify(event));
	}
};

(function initGame(){
	var elements = Array.prototype.slice.call(document.getElementsByTagName("td"));
	elements.forEach(function(element){
		element.addEventListener('click', function(){
			game.emit({ type:'turn' + checkGameState().player, data: { boardPosition: this.id } });
			refreshGame();
		});
	});
	
	refreshGame();
})();

function refreshGame(){
	var gameState = checkGameState();
	resetBoard();
	redrawBoard(gameState);
	reviewGame(gameState);
};

function reviewGame(gameState){
	if((gameState.situation === "WON" || gameState.situation === "DRAW") 
		&& confirm("New game?")) {
		game.emit({type:'reset', data: {}});
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