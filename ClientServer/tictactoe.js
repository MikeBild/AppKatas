var http = require("http"),
	webserver = http.createServer();

	function intersect(a, b){
	  var ai=0, bi=0;
	  var result = new Array();

	  while( ai < a.length && bi < b.length )
	  {
	     if      (a[ai] < b[bi] ){ ai++; }
	     else if (a[ai] > b[bi] ){ bi++; }
	     else /* they're equal */
	     {
	       result.push(a[ai]);
	       ai++;
	       bi++;
	     }
	  }

	  return result;
	};

	var Aggregate = function(){
		var events = [];
		return {
			when: function(match){
					state = match.$init ? match.$init : {};
					for (var i = 0; i < events.length; i++) {
						if(match[events[i].type] && events[i].data)
							state = match[events[i].type](state, events[i].data);
					}
					return state;
			},
			emit: function(event){
				events.push(event);
			}
		}
	};

	var game = new Aggregate();

	var checkGameState = function() {
		var checkWinner = function(playerTurns, solutions){
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

		var rejectTurn = function(state, event){
			return state.turnX.concat(state.turnO).indexOf(event.pos) !== -1;
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
			playerX: function(state, event){
				if(rejectTurn(state, event))
					return state;
				
				state.round++;
				state.turnX.push(event.pos);

				state.situation = checkWinner(state.turnX, state.solutions);
				state.player = state.player === "X" ? "O" : "X";
				return state;
			},
			playerO: function(state, event){
				if(rejectTurn(state, event))
					return state;
				
				state.round++;
				state.turnO.push(event.pos);

				state.situation = checkWinner(state.turnO, state.solutions);
				state.player = state.player === "X" ? "O" : "X";
				return state;
			},
			reset: function(state, event){
				console.log("reset");
				state.round = 0;
				state.turnO = [];
				state.turnX = [];
				state.player = "X";
				state.situation = "START";
				return state;
			}
		});
	};

webserver.on('request', function(req, res){
	res.setHeader("access-control-allow-origin","*");
	res.setHeader("access-control-allow-methods","GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("access-control-allow-headers","content-type, accept");

	if(req.method === 'OPTIONS'){
		return res.end();		
	}

	if(req.url === '/status'){
		var gameState = JSON.stringify(checkGameState());
		return res.end(gameState);
	};

	if(req.url === '/emit' && req.method === 'POST'){
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			game.emit(JSON.parse(body));
			return res.end("OK Emit");
		});
	};
});

webserver.listen(9001);