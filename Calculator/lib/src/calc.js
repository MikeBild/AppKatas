"use strict";
var ES = require('./es').ES;

(function(exports){
	var fsm = new ES.Aggregate();
	exports.fsm = fsm;
	exports.evaluate = function() {
		return fsm.when({
			$init: {
				expression: "",
				result: 0,
			},
			enteredNumber: function(state, event){
				state.expression += event.number + " ";
				return state;
			},
			enteredOperation: function(state, event){
				state.expression += event.operation + " ";
				return state;
			},
			executed: function(state, event){
				state.result = eval(state.expression);
				return state;
			},
			reseted: function(state, event){
				state.expression = "";
				state.result = 0;
				return state;
			}
		});
	};
	exports.evaluateRPN = function() {
		var expressionToRPN = function(state, event){
			var operations = [];
			var exp = state.expression.trim().split(" ");
			exp.forEach(function(value){
				if(!isNaN(value)){
					state.rpn.push(value);
				}
				if(value === "+" || value === "-"){
					var op = operations.pop();
					if(op) state.rpn.push(op);
					operations.push(value);
				}
			});
			state.rpn.push(operations.pop());
			return state;
		};

		var evaluateRPN = function(state, event){
			var rpn = JSON.parse(JSON.stringify(state.rpn));
			while(rpn.length > 1){
				var l = parseInt(rpn.shift());
				var r = parseInt(rpn.shift());
				var o = rpn.shift();
				switch(o){
					case "+": rpn.unshift(l+r); break;
					case "-": rpn.unshift(l-r); break;
				}
			}
			state.result = rpn.indexOf(null) !== -1 ? NaN : rpn[0];
		};

		return fsm.when({
			$init: {
				expression: "",
				rpn: [],
				result: 0,
			},
			enteredNumber: function(state, event){
				state.expression += event.number + " ";
				return state;
			},
			enteredOperation: function(state, event){
				state.expression += event.operation + " ";
				return state;
			},
			executed: function(state, event){
				expressionToRPN(state, event);
				evaluateRPN(state, event);
				return state;
			},
			reseted: function(state, event){
				state.expression = "";
				state.rpn = [];
				state.result = 0;
				return state;
			}
		});
	};
	exports.evaluateRPNOP = function() {
		var precedence = function(value){
			switch(value){
					case "+": return 4;
					case "-": return 4;
					case "*": return 3;
					case "/": return 3;
				}
		};

		var expressionToRPN = function(state, event){
			var operations = [];
			var exp = state.expression.trim().split(" ");
			exp.forEach(function(value){

				if(!isNaN(value))
					state.rpn.push(value);

				if(value === "+" || value === "-" || value === "*" || value === "/"){
					if((operations.length === 0) 
						|| (precedence(operations[0]) > precedence(value)))
						operations.unshift(value);
					else{
						do{	
							state.rpn.push(operations.shift());
						}while((operations.length !== 0) 
							&& (precedence(value) >= precedence(operations[0])))

						operations.unshift(value);
					}
				}
			});
			do{	
				state.rpn.push(operations.shift());
			}while(operations.length !== 0)
			return state;
		};

		var evaluateRPN = function(state, event){
			var rpn = JSON.parse(JSON.stringify(state.rpn));
			do
			{
				for(var i in rpn) {
					var left = parseInt(rpn[i-2]),
						right = parseInt(rpn[i-1]);

					if(rpn[i] === "+") {
						var value = left+right;
						rpn.splice(i-2, 3, value);
						break;
					}
					if(rpn[i] === "-") {
						var value = left-right;
						rpn.splice(i-2, 3, value);
						break;
					}
					if(rpn[i] === "*") {
						var value = left*right;
						rpn.splice(i-2, 3, value);
						break;
					}
					if(rpn[i] === "/") {
						var value = left/right;
						rpn.splice(i-2, 3, value);
						break;
					}
				}
			}while(rpn.indexOf(null) === -1 && rpn.length > 1);
			state.result = rpn.indexOf(null) !== -1 ? NaN : rpn[0];
		};

		return fsm.when({
			$init: {
				expression: "",
				rpn: [],
				result: 0,
			},
			enteredNumber: function(state, event){
				state.expression += event.number + " ";
				return state;
			},
			enteredOperation: function(state, event){
				state.expression += event.operation + " ";
				return state;
			},
			executed: function(state, event){
				expressionToRPN(state, event);
				evaluateRPN(state, event);
				return state;
			},
			reseted: function(state, event){
				state.expression = "";
				state.rpn = [];
				state.result = 0;
				return state;
			}
		});
	};
})(exports.Calc = {});