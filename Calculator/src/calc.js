"use strict";

var Calculator = require("../lib/src/calc").Calc;
(function initCalculator(){	
	Array.prototype.slice.call(document.getElementsByName("number"))
		.forEach(function(element){
			element.addEventListener('click', function(){
				console.log(this.innerText);
				Calculator.fsm.emit({ 
					type:'enteredNumber',
					data: { number: this.innerText } 
				});
				refeshView();
			});
		});
	Array.prototype.slice.call(document.getElementsByName("operator"))
		.forEach(function(element){
			element.addEventListener('click', function(){
				console.log(this.innerText);
				Calculator.fsm.emit({ 
					type:'enteredOperation',
					data: { operation: this.innerText } 
				});
				refeshView();
			});
		});
	Array.prototype.slice.call(document.getElementsByName("execute"))
		.forEach(function(element){
			element.addEventListener('click', function(){
				console.log(this.innerText);
				Calculator.fsm.emit({ 
					type:'executed',
					data: {} 
				});
				refeshView();
				Calculator.fsm.emit({type:"reseted", data: {}});
			});
		});
	Array.prototype.slice.call(document.getElementsByName("reset"))
		.forEach(function(element){
			element.addEventListener('click', function(){
				console.log(this.innerText);
				Calculator.fsm.emit({ 
					type:'reseted',
					data: { } 
				});
				refeshView();
			});
		});

})();

var refeshView = function(){
	var calculation = Calculator.evaluateRPNOP();
	document.getElementById("expression").innerText = calculation.expression;
	document.getElementById("rpn").innerText = calculation.rpn;
	document.getElementById("result").innerText = calculation.result;
	document.getElementById("io").value = calculation.result ? calculation.result : calculation.expression;
}