var game = new Aggregate();
var checkGameState = function() {
	var addTurn = function(turns, turn){
		turns.push(turn);
	};

	var reviewTurn = function(playerTurns, solutions){
		playerTurns.sort();
		for(var i in solutions){
			var intersection = intersect(playerTurns, solutions[i]);
			if(intersection.toString() === solutions[i].toString())
				return "WON";
		}
		if(state.round === 9)
			return "DRAW";
		return "RUNNING";
	};

	var isClashedTurn = function(state, event){
		return state.turnX.concat(state.turnO).indexOf(event.boardPosition) !== -1;
	};

	var togglePlayer = function(player, situation){
		if(situation === "WON" || situation === "DRAW") return player;
		return (player === "X") ? "O" : "X";
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
		turnX: function(state, event){
			if(isClashedTurn(state, event)) return state;
			
			state.round++;
			addTurn(state.turnX, event.boardPosition);
			state.situation = reviewTurn(state.turnX, state.solutions);
			state.player = togglePlayer(state.player, state.situation);
			return state;
		},
		turnO: function(state, event){
			if(isClashedTurn(state, event)) return state;
			
			state.round++;
			addTurn(state.turnO, event.boardPosition);
			state.situation = reviewTurn(state.turnO, state.solutions);
			state.player = togglePlayer(state.player, state.situation);

			return state;
		}
	});
};