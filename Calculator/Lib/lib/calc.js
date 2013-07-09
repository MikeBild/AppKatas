"use strict";
var ES = require('./es').ES;

(function(exports){
	var fsm = new ES.Aggregate();
	exports.fsm = fsm;
	exports.evaluate = function() {
		return fsm.when({
			$init: {
				expression: "",
				result:""
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
})(exports.Calc = {});