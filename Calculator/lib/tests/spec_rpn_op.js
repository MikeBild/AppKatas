var assert = require("assert"),
	Calc = require("../src/calc").Calc;

describe('RPN Calculator (with precedences)', function(){
	describe('evaluate 5+5', function(){
		it('should return 10', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPNOP();
			assert.equal(actual.result, 10);
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
			var actual = Calc.evaluateRPNOP();
			assert.equal(actual.result, 11);
		});
	});
	describe('evaluate 3*4-2', function(){
		it('should return 10', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"*"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"-"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"2"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPNOP();
			assert.equal(actual.result, 10);
		});
	});
	describe('evaluate 3+4*2/4-3', function(){
		it('should return 2', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"*"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"2"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"/"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"-"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPNOP();
			assert.equal(actual.result, 2);
		});
	});
});