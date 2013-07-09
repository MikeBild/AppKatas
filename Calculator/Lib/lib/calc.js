"use strict";
var ES = require('./es').ES;

(function(exports){
	var fsm = new ES.Aggregate();
	exports.fsm = fsm;
	exports.evaluate = function() {
		return fsm.when({
			$init: {
				expression: "",
				result:"",
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
				state.result = "";
				return state;
			}
		});
	};
	exports.evaluateRPN = function() {
		var expressionToRPN = function(state, event){
			var exp = state.expression.trim().split(" ");
			exp.forEach(function(value){
				if(!isNaN(value)){
					state.rpn.push(value);
				}
				if(value === "+" || value === "-"){
					var op = state.operations.pop();
					if(op) state.rpn.push(op);
					state.operations.push(value);
				}
			});
			state.rpn.push(state.operations.pop());
			return state;
		};

		var evaluateRPN = function(state, event){
			while(state.rpn.length > 1){
				var l = parseInt(state.rpn.shift());
				var r = parseInt(state.rpn.shift());
				var o = state.rpn.shift();
				switch(o){
					case "+": state.rpn.unshift(l+r); break;
					case "-": state.rpn.unshift(l-r); break;
				}
			}
			state.result = state.rpn;
		};

		return fsm.when({
			$init: {
				expression: "",
				rpn: [],
				operations:[],
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
				state.operations = [];
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
			var exp = state.expression.trim().split(" ");
			exp.forEach(function(value){

				if(!isNaN(value)){
					state.rpn.push(value);
				}
				if(value === "+" || value === "-" || value === "*" || value === "/"){
					if((state.operations.length === 0) || (precedence(state.operations[0]) > precedence(value))){
						state.operations.unshift(value);
					}else{
						do{	
							state.rpn.push(state.operations.shift());
						}while((state.operations.length !== 0) && (precedence(value) >= precedence(state.operations[0])))
						state.operations.unshift(value);
					}
				}
			});
			do{	
				state.rpn.push(state.operations.shift());
			}while(state.operations.length !== 0)
			return state;
		};

		var evaluateRPN = function(state, event){
			do
			{
				for(var i in state.rpn) {
					var left = parseInt(state.rpn[i-2]),
						right = parseInt(state.rpn[i-1]);

					if(state.rpn[i] === "+") {
						var value = left+right;
						state.rpn.splice(i-2, 3, value);
						break;
					}
					if(state.rpn[i] === "-") {
						var value = left-right;
						state.rpn.splice(i-2, 3, value);
						break;
					}
					if(state.rpn[i] === "*") {
						var value = left*right;
						state.rpn.splice(i-2, 3, value);
						break;
					}
					if(state.rpn[i] === "/") {
						var value = left/right;
						state.rpn.splice(i-2, 3, value);
						break;
					}
				}
			}while(state.rpn.length > 1);
			state.result = state.rpn;
		};

		return fsm.when({
			$init: {
				expression: "",
				rpn: [],
				operations:[],
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
				state.operations = [];
				state.result = 0;
				return state;
			}
		});
	};
})(exports.Calc = {});