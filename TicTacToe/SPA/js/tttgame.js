"use strict";
(function(exports){
	var game = new ES.Aggregate();
	exports.game = game;
	exports.checkGameState = function() {
		var addTurn = function(state, event){
			return function(turns){
				turns.push(event.boardPosition);
				return state;			
			};
		};
		
		var reviewWon = function(state, event){
			return function(turns){
				turns.sort();
				for(var i in state.solutions){
					var intersection = Util.intersect(turns, state.solutions[i]);
					if(intersection.toString() === state.solutions[i].toString())
						state.situation = "WON";
				}
				return state;			
			};
		};

		var reviewDraw = function(state, event){
			if(state.round === 9 && state.situation !== "WON") state.situation = "DRAW";
			return state;
		};

		var isClashedTurn = function(state, event){
			return state.turnX.concat(state.turnO).indexOf(event.boardPosition) !== -1;
		};

		var togglePlayer = function(state, event){
			if(state.situation === "WON" || state.situation === "DRAW") return state;
			state.player = (state.player === "X") ? "O" : "X";
			return state;
		};

		return game.when({
			$init: {
				player: "X",
				situation: "START",
				turnX: [],
				turnO: [],
				round: 0,
				solutions: [
					[11,12,13],
					[21,22,23],
					[31,32,33],
					[11,22,33],
					[13,22,31],
					[11,21,31],
					[12,22,32],
					[13,23,33]
				]
			},
			playedX: function(state, event){
				if(isClashedTurn(state, event)) return state;
				
				state.round++;
				state.situation = "RUNNING";
				addTurn(state, event)(state.turnX);
				reviewWon(state, event)(state.turnX);
				reviewDraw(state, event);
				togglePlayer(state, event);
				return state;
			},
			playedO: function(state, event){
				if(isClashedTurn(state, event)) return state;
				
				state.round++;
				state.situation = "RUNNING";
				addTurn(state, event)(state.turnO);
				reviewWon(state, event)(state.turnO);
				reviewDraw(state, event);
				togglePlayer(state, event);
				return state;
			},
			reseted: function(state, event){
				state.round = 0;
				state.turnO = [];
				state.turnX = [];
				state.player = "X";
				state.situation = "START";
				return state;
			}
		});
	};
})(window.TTT = {});