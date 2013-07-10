var assert = require("assert"),
	Calc = require("../src/calc").Calc;

describe('RPN Calculator (without precedences)', function(){
	describe('evaluate 3+4', function(){
		it('should return 7', function(){
			Calc.fsm.emit({type:"reseted", data: {}});
			
			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert.equal(actual.result, 7);
		});
	});
	describe('evaluate 3+4-2', function(){
		it('should return 5', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"-"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"2"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert.equal(actual.result, 5);
		});
	});
	describe('evaluate 3+4-2+5', function(){
		it('should return 10', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"3"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"4"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"-"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"2"}});
			Calc.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert.equal(actual.result, 10);
		});
	});
	describe('evaluate 5 5', function(){
		it('should return NaN', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert(isNaN(actual.result),"result is not NaN");
		});
	});
	describe('evaluate 5', function(){
		it('should return NaN', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredNumber", data: {number:"5"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert(isNaN(actual.result),"result is not NaN");
		});
	});
	describe('evaluate +', function(){
		it('should return NaN', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredOperation", data: {number:"+"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert(isNaN(actual.result),"result is not NaN");
		});
	});
	describe('evaluate + +', function(){
		it('should return NaN', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredOperation", data: {number:"+"}});
			Calc.fsm.emit({type:"enteredOperation", data: {number:"+"}});
			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert(isNaN(actual.result),"result is not NaN");
		});
	});
	describe('evaluate + 9 - 7', function(){
		it('should return NaN', function(){
			Calc.fsm.emit({type:"reseted", data: {}});

			Calc.fsm.emit({type:"enteredOperation", data: {number:"+"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"9"}});
			Calc.fsm.emit({type:"enteredOperation", data: {number:"-"}});
			Calc.fsm.emit({type:"enteredNumber", data: {number:"7"}});

			Calc.fsm.emit({type:"executed", data: {}});
			var actual = Calc.evaluateRPN();
			assert(isNaN(actual.result),"result is not NaN");
		});
	});
});