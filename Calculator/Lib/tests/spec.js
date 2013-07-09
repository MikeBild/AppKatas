var assert = require("assert"),
	Calc = require("../lib/calc").Calc;
	
describe('Calculator', function(){
	describe('evaluate 3+4', function(){
		it('should return 7', function(){
			Calc.fsm.emit({type:"reseted", data: {}});
			
			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluate();
			assert.equal(actual.result, 7);
		});
	});
	describe('evaluate 3+4*2', function(){
		it('should return 11', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"*"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"2"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluate();
			assert.equal(actual.result, 11);
		});
	});
});