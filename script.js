
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
    // displayHasDecimal = false;  <- test this tomorrow
}

function updateDisplayOperator(e) {
    if(displayValue != '' && firstValue != '') {  //assures only 1 pair of numbers are evaluated at a time incase user wants to chain the answer
        displayValue = operate(currentOperator,+firstValue,+displayValue);
        topDisplay.textContent = `${displayValue} ${e.target.textContent}`;
        bottomDisplay.textContent = displayValue;
        displayHasDecimal = false;
        firstValue ='';
    }
    currentOperator = e.target.textContent;
    operatorSelected = true;
    justEvaluated = false;
    topDisplay.textContent = `${displayValue} ${e.target.textContent}`;
    
    
}
//All += operations deal with strings and not ints
function updateDisplayNum(e) {
    if (operatorSelected) {
        firstValue = displayValue;
        displayValue = '';
        operatorSelected = false;
        displayHasDecimal = false;
    }

 
   
   if (justEvaluated) { //if the equal sign was pressed just reset the calculator
            clearCalc();
            justEvaluated = false;
        }
    if (e.target.textContent == '.' && !displayHasDecimal) {         //if and else if handles decimal 
            displayHasDecimal = true;
            displayValue += e.target.textContent ;
            bottomDisplay.textContent = displayValue;
            return;
    }else if (e.target.textContent == '.' && displayHasDecimal) {
        return;
    }
    
    displayValue += e.target.textContent ;
    bottomDisplay.textContent = displayValue;
    
     
       
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
    displayHasDecimal = false;
    displayValue='';
    firstValue='';
    currentOperator=''
    topDisplay.textContent='';
    bottomDisplay.textContent='0';
    operatorSelected = false;
}

function handleDelete() {
    if (operatorSelected) {
        firstValue = displayValue;
        operatorSelected = false;
    }
    removeLastChar = displayValue.slice(0, displayValue.length -1);

    deletedChar = displayValue.slice(displayValue.length -1);
    if (deletedChar == '.') displayHasDecimal = false;
    
    displayValue = removeLastChar;
    bottomDisplay.textContent = displayValue;
    
}

let displayHasDecimal = false;
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
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

del.addEventListener('click', handleDelete);
decimal.addEventListener('click', updateDisplayNum);
equals.addEventListener('click', handleEvaluation);
clear.addEventListener('click', clearCalc);
operatorBtns.forEach(btn => btn.addEventListener('click', updateDisplayOperator));
numberBtns.forEach(btn => btn.addEventListener('click', updateDisplayNum));