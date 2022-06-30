
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) return "Don't You Dare...";
    else
    return num1 / num2;
}

function operate(operator, num1, num2) {

    switch(operator) {
        case '+': return add(num1, num2);
        
        case '-': return subtract(num1,num2);

        case 'x': return multiply(num1, num2);

        case'÷': return divide(num1,num2);
    }
    currentOperator='';
}

function updateDisplayOperator(e) {
    if(displayValue != '' && firstValue != '') {
        displayValue = operate(currentOperator,+firstValue,+displayValue);
        topDisplay.textContent = `${displayValue} ${e.target.textContent}`;
        bottomDisplay.textContent = displayValue;
    }
    currentOperator = e.target.textContent;
    operatorSelected = true;
    
    topDisplay.textContent = `${displayValue} ${e.target.textContent}`;
    firstValue = displayValue;
    displayValue = '';
    
}

function updateDisplayNum(e) {
    
    if(!operatorSelected) {
        if (justEvaluated) {
            clearCalc();
            justEvaluated = false;
        }
        displayValue += e.target.textContent;
        bottomDisplay.textContent = displayValue;
    }
    else {
      operatorSelected = false;
      displayValue += e.target.textContent;
      bottomDisplay.textContent = displayValue;
    }
}

function handleEvaluation(e) {
    if (displayValue == '' || firstValue =='' ) return;
    topDisplay.textContent += ` ${displayValue} =`;
   displayValue = operate(currentOperator, +firstValue, +displayValue);
  
   bottomDisplay.textContent = displayValue;
   currentOperator='';
   firstValue = '';
   justEvaluated = true; //causes the answer to not be manipulated unless an operation happens directly after
}

function clearCalc() {  //full reset
    displayValue='';
    firstValue='';
    currentOperator=''
    topDisplay.textContent='';
    bottomDisplay.textContent='0';
    operatorSelected = false;
}

let firstValue ='';
let displayValue ='';
let currentOperator='';
let operatorSelected = false;
let justEvaluated = false;
const bottomDisplay = document.querySelector('.bottom-display');
const topDisplay = document.querySelector('.top-display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
equals.addEventListener('click', handleEvaluation);
clear.addEventListener('click', clearCalc)
operatorBtns.forEach(btn => btn.addEventListener('click', updateDisplayOperator));
numberBtns.forEach(btn => btn.addEventListener('click', updateDisplayNum));