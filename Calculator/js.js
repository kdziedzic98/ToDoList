let buttons;
let turnOnButton;
let result;
let clearKey;
let calculator;
let screen;

buttons = document.querySelectorAll('button:not(.turnOn)');
clearKey = document.querySelector('.btnClear');
turnOnButton = document.querySelector('.turnOn');
result = document.querySelector('.screen > p');
keys = document.querySelector('.buttons');
calculator = document.querySelector('.calculator');

keys.addEventListener('click', e => {
    if(e.target.matches('button:not(.turnOn)')){
        const key = e.target;
        const action = key.dataset.action;
        const resultNum = result.textContent;
        const previousKey = calculator.dataset.previousKey;

        if(e.target.matches('.btnClear')){
            clearBoard();
        }

        if(!action){
            if(result.textContent == "0" || previousKey == 'operator'){
                result.textContent = key.textContent;
            }
            else{
                result.textContent =  result.textContent + key.textContent;
            }

        }

        if(action == "decimal" && !resultNum.includes('.')){
            result.textContent = resultNum + '.';
        }


        if(result.textContent == "0"){
            clearKey.textContent = "AC";
        }
        else{
            clearKey.textContent = "C";
        }

        if(action == 'add' || action == 'subtract' || action == 'multiply' || action == 'divide'){
            calculator.dataset.firstNumber = resultNum;
            calculator.dataset.operator = action;
            calculator.dataset.previousKey = 'operator';
        }
        else if(!action){
            calculator.dataset.previousKey = 'number';
        }
        else if(action == 'clear'){
            calculator.dataset.previousKey = 'clear';
        }
        else if(action == 'decimal'){
            calculator.dataset.previousKey = 'decimal';
        }
        else if(action == 'calculate'){
            calculator.dataset.previousKey = 'calculate';
        }

        if(previousKey == 'operator' && !resultNum == '' && action == 'decimal'){
            result.textContent = '0.';
        }


        if(action == 'calculate'){
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            const secondNumber = resultNum;

            result.textContent = calculate(firstNumber, operator, secondNumber);

        }
        
        
    }

})

function turnOn(){
    for (button of buttons){
        button.toggleAttribute('disabled');
    }

    if(this.value == "Block"){
        this.value = "Unblock";
        result.textContent = '0';
        turnOnButton.style.backgroundColor = '#D2D2D2';
    }
    else{
        this.value = "Block";
        turnOnButton.style.backgroundColor = 'rgb(73, 184, 73)';
        result.textContent = '';
        clearKey.textContent = "AC";
        calculator.dataset.previousKey = '';
        calculator.dataset.operator = '';
        calculator.dataset.firstNumber = '';
    }
}


function clearBoard(){
    if(turnOnButton.value == 'Unblock'){
        result.textContent = '0';
        calculator.dataset.previousKey = '';
        calculator.dataset.operator = '';
        calculator.dataset.firstNumber = '';
    }
}


const calculate = (firstNumber, operator, secondNumber) => {
    const n1 = parseFloat(firstNumber);
    const n2 = parseFloat(secondNumber);

    if(operator == 'add'){
        return n1 + n2;
    }
    else if(operator == 'subtract'){
        return n1 - n2;
    }
    else if(operator == 'multiply'){
        return n1 * n2;
    }
    else if(operator == 'divide'){
        return n1 / n2;
    }
}


turnOnButton.addEventListener('click', turnOn);