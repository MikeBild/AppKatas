var http = require("http"),
	webserver = http.createServer(),
	TTT = require("./lib/tttgame").TTT;

webserver.on('request', function(req, res){
	res.setHeader("access-control-allow-origin","*");
	res.setHeader("access-control-allow-methods","GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("access-control-allow-headers","content-type, accept");

	if(req.method === 'OPTIONS'){
		return res.end();		
	}

	if(req.url === '/status'){
		var gameState = JSON.stringify(TTT.checkGameState());
		return res.end(gameState);
	};

	if(req.url === '/emit' && req.method === 'POST'){
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			TTT.game.emit(JSON.parse(body));
			return res.end("OK Emit");
		});
	};
});

webserver.listen(9001);