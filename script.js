
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
    let inputValue = '';
    if (typeof e === 'object') {                    //if e is an event object then we take the t
        inputValue = e.target.textContent;
    }
    else inputValue = e;
    

    
    if (displayValue =="Don't You Dare...") return;
    //if (topDisplay.textContent == '');
    if(displayValue !== '' && firstValue !== '') {  //assures only 1 pair of numbers are evaluated at a time incase user wants to chain the answer
        
        displayValue = operate(currentOperator,+firstValue,+displayValue);
       
        if(dividedByZero()) return;

        if (+displayValue < 0) displayIsNegative = true;
        displayValue =  handleLargeNumbers() ? displayValue : +displayValue;
        topDisplay.textContent = `${displayValue} ${inputValue}`;
        bottomDisplay.textContent = displayValue;
        displayHasDecimal = false;
        firstValue ='';
    }
    currentOperator = inputValue;
    operatorSelected = true;
    justEvaluated = false;
   
    displayValue =  handleLargeNumbers() ? displayValue : +displayValue;
    topDisplay.textContent = `${displayValue} ${inputValue}`;
    
    
}
//All += operations deal with strings and not ints
function updateDisplayNum(e) {
    let inputValue = '';
    if (typeof e === 'object') {                    //if e is an event object then we take the t
        inputValue = e.target.textContent;
    }
    else inputValue = e;
    
    if (displayValue.length >= maxDisplayLength && !operatorSelected) return;  //max num lenght on the line

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
    if (inputValue == '.' && !displayHasDecimal) {         //if and else if handles decimal 
            displayHasDecimal = true;
            displayValue += inputValue ;
            bottomDisplay.textContent = displayValue;
            return;
    }else if (inputValue == '.' && displayHasDecimal) {
        return;
    }
    
    handleInitialZero(inputValue);
   

    if (+displayValue < 0) displayIsNegative = true;
    else displayIsNegative = false; 
       
}



function handleEvaluation(e) {
    

    if (displayValue == '' || firstValue == '' ) return;
    topDisplay.textContent += ` ${displayValue} =`;
    displayValue = operate(currentOperator, +firstValue, +displayValue);
  
   if (+displayValue < 0) displayIsNegative = true;
  
   bottomDisplay.textContent =  handleLargeNumbers() ? displayValue : +displayValue;
   currentOperator='';
   firstValue = '';
   justEvaluated = true; //causes the answer to not be manipulated unless an operation happens directly after
}

function clearCalc() {  //full reset
    displayIsNegative = false;
    displayHasDecimal = false;
    displayValue='0';
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
    if (deletedChar=='-') displayIsNegative = false;
    displayValue = removeLastChar;
    bottomDisplay.textContent = displayValue;
    
}

function handleNegative() {
    if (displayIsNegative) {
        displayValue = displayValue.toString().substring(1);
        bottomDisplay.textContent = displayValue;
        displayIsNegative = false;
    }
    else {
        displayValue = `-${displayValue}`
        bottomDisplay.textContent = displayValue;
        displayIsNegative = true;
    }
}

function handleLargeNumbers() {
    if(displayValue == "Don't You Dare...") return true;
    if (displayValue.toString().length > maxDisplayLength) {
        if (displayValue != null)displayValue = displayValue.toPrecision(8); 
                                                        /* Fixes a weird way on how leading 0's generate on decimal divsion without shortening
                                                        and also shortens large numbers down to exponential value */
        if (+displayValue > maxInteger) {
            
            return true;
        }
        else {
            return false;
        }
   }
}

function dividedByZero() {
    if (displayValue =="Don't You Dare...")  {
        topDisplay.textContent = '';
        bottomDisplay.textContent = displayValue;
        displayHasDecimal = false;
        displayIsNegative = false;
        firstValue ='';
        displayValue='0';
        return true;
    }
    else return false;
}

function handleInitialZero(inputValue) {
    if (displayValue == '0')  {  //replaces the initial 0 with whatever number entered
        displayValue = inputValue ;
        bottomDisplay.textContent = displayValue;
        
    }

    else if(displayValue=='-0') {   //replaces the initial 0 with whatever number entered
        displayValue = `-${inputValue}`;
        bottomDisplay.textContent = displayValue;
    }
    else {
    displayValue += inputValue ;
    bottomDisplay.textContent = displayValue;
    }
}

function handleKeyboardInput(e) {
    switch(e.key) {
       case'Backspace': handleDelete(); break;
    
       case'.': updateDisplayNum('.'); break;
       case '0' : updateDisplayNum('0'); break;
       case '1': updateDisplayNum('1'); break;
       case '2' : updateDisplayNum('2'); break;
       case '3': updateDisplayNum('3'); break;
       case '4' : updateDisplayNum('4'); break;
       case '5': updateDisplayNum('5');  break;
       case '6' : updateDisplayNum('6'); break;
       case '7': updateDisplayNum('7'); break;
       case '8' : updateDisplayNum('8'); break;
       case '9': updateDisplayNum('9'); break;

       case '+' : updateDisplayOperator('+'); break;
       case '-' : updateDisplayOperator('-'); break;
       case '*' :
       case 'x' : updateDisplayOperator('x'); break;
       case '/' :updateDisplayOperator('÷'); break;

       case '=' : handleEvaluation(); break;
       case 'Enter': e.stopPropagation();
                     e.preventDefault();
                     handleEvaluation(); break;

    }
}


let displayIsNegative = false;
let displayHasDecimal = false;
let firstValue ='';
let displayValue ='0';
let currentOperator='';
let operatorSelected = false;
let justEvaluated = false;

const maxDisplayLength = 12;
const maxInteger = 999999999999 // 12 length

const bottomDisplay = document.querySelector('.bottom-display');
const topDisplay = document.querySelector('.top-display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const negative = document.querySelector('.negative');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');


document.addEventListener('keydown', handleKeyboardInput)


negative.addEventListener('click', handleNegative);
del.addEventListener('click', handleDelete);
decimal.addEventListener('click', updateDisplayNum);
equals.addEventListener('click', handleEvaluation);
clear.addEventListener('click', clearCalc);
operatorBtns.forEach(btn => btn.addEventListener('click', updateDisplayOperator));
numberBtns.forEach(btn => btn.addEventListener('click', updateDisplayNum));