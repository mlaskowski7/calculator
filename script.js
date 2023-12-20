const calculatorScreen = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button'); 
const clearBtn = document.getElementById('clear-button');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){

    if(awaitingNextValue){
        calculatorScreen.textContent = number;
        awaitingNextValue = false;
    } else{
        calculatorScreen.textContent = calculatorScreen.textContent === '0' ? number : calculatorScreen.textContent + number;
    }
    
}

function addDecimal(){
    if(awaitingNextValue){
        return;
    }

    if(!calculatorScreen.textContent.includes('.')){
        calculatorScreen.textContent =`${calculatorScreen.textContent}.`;
    } 
}

function clearScreen(){
    calculatorScreen.textContent ='0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

const calculate = {
    '/':(firstNumber,secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber,secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber,secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber,secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber,secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorScreen.textContent);
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    } else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorScreen.textContent =calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}


inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    } 
});

clearBtn.addEventListener('click', clearScreen)
