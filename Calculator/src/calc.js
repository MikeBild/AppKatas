var Calculator = require("../Lib/src/calc").Calc;

Calculator.fsm.emit({type:"reseted", data: {}});
Calculator.fsm.emit({type:"enteredNumber", data: {number:"3"}});
Calculator.fsm.emit({type:"enteredOperation", data: {operation:"+"}});
Calculator.fsm.emit({type:"enteredNumber", data: {number:"4"}});
Calculator.fsm.emit({type:"enteredOperation", data: {operation:"*"}});
Calculator.fsm.emit({type:"enteredNumber", data: {number:"2"}});
Calculator.fsm.emit({type:"enteredOperation", data: {operation:"/"}});
Calculator.fsm.emit({type:"enteredNumber", data: {number:"4"}});
Calculator.fsm.emit({type:"enteredOperation", data: {operation:"-"}});
Calculator.fsm.emit({type:"enteredNumber", data: {number:"3"}});
Calculator.fsm.emit({type:"executed", data: {}});
var calculation = Calculator.evaluateRPNOP();
console.log(calculation);
document.getElementById("expression").innerText = calculation.expression;
document.getElementById("rpn").innerText = calculation.rpn;
document.getElementById("result").innerText = calculation.result;


