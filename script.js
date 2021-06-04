function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
multiply = (a,b) => {
    return a*b;
};
divide = (a,b) => a/b;
remainder = (a,b) => a%b;
operate = (operator,a,b) =>{
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case '%':
            return remainder(a,b);
    }
};


let main = document.querySelector('main');
let display = document.querySelector('.display');
let backspace = document.querySelector('.backspace');
let errorMsg = document.createElement('p');
const numbers = document.querySelectorAll('.numbers');
const toggle = document.querySelector('.toggle');
const operators = document.querySelectorAll('.operators');
const evaluate = document.querySelector('.evaluate');
let firstNumber = '',secondNumber = '',curOperator='';


function addNumberToDisplay(e){
    display.style.transform = 'scaleX(1.1)';
    if(curOperator===''){
        if(e.target.textContent=='.'){
            if(firstNumber.includes('.')) return;
        }
        if(e.target.textContent=='r'){
            let rand = Math.floor(Math.random()*10).toString();
            firstNumber += rand;
            display.textContent = firstNumber;
        }
        else{
            firstNumber += e.type=='click'?e.target.textContent:e.key;
            display.textContent = firstNumber;
        }
    }
    else{
        if(e.target.textContent=='.'){
            if(secondNumber.includes('.')) return;
        }
        if(e.target.textContent=='r'){
            let rand = Math.floor(Math.random()*10).toString();
            secondNumber += rand;
            display.textContent = secondNumber;
        }
        secondNumber += e.type=='click'?e.target.textContent:e.key;
        display.textContent += e.type=='click'?e.target.textContent:e.key;
    }
    e.target.stopTransmission();
}

function addOperatorToDisplay(e){
    if(curOperator!==''){
        let result = operate(curOperator,Number(firstNumber),Number(secondNumber));
        if(result===Infinity){
            errorMsg.textContent = 'Error: Answer is Infinite. Please press Reset and start again!';
            display.parentNode.insertBefore(errorMsg,display.nextSibling);
        }
        if(result*10e5!==Math.floor(result*10e5)) result=result.toFixed(5);
        firstNumber = ''+result;
        secondNumber = '';
        display.textContent = ''+firstNumber;
    }
    display.textContent += e.type=='click'?e.target.textContent:e.key;
    curOperator = e.type=='keydown'?e.key:e.target.textContent;
}
function evaluateCurExpression(e){
    if(secondNumber!==''){
        let result = operate(curOperator,Number(firstNumber),Number(secondNumber));
        if(result===Infinity){
            errorMsg.textContent = 'Error: Answer is Infinite. Please press Reset and start again!';
            display.parentNode.insertBefore(errorMsg,display.nextSibling);
        }
        if(result*10e5!==Math.floor(result*10e5)) result=result.toFixed(5);
        firstNumber = ''+result;
        secondNumber = '';
        display.textContent = ''+firstNumber;
        curOperator = '';
    }
}
function removeLastChar(e){
    if(display.textContent.length==0) return;
    const lastChar = display.textContent[display.textContent.length-1];
    if(lastChar=='+' || lastChar =='-' || lastChar =='*' || lastChar=='/' || lastChar=='%'){
        curOperator = '';
    }
    else{
        if(secondNumber!=''){
            secondNumber = secondNumber.slice(0,secondNumber.length-1);
        }
        else{
            firstNumber = firstNumber.slice(0,firstNumber.length-1);
        }
    }
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
}
function addKeyboardSupport(e){
    display.style.transform = 'scaleX(1.1)';
    if(e.key==='+'||e.key==='-'||e.key==='*'||e.key==='/'||e.key==='%'){
        addOperatorToDisplay(e);
    }
    else if(e.keyCode===8){
        removeLastChar(e);
    }
    else if(e.key==='=' || e.keyCode===13){
        evaluateCurExpression(e);
    }
    else if(e.keyCode>=48 && e.keyCode<=57) addNumberToDisplay(e);
}



document.addEventListener('keydown',addKeyboardSupport);
numbers.forEach( number =>{
    number.addEventListener('click',addNumberToDisplay);
}
);
operators.forEach( operator => {
    operator.addEventListener('click',addOperatorToDisplay);
});
evaluate.addEventListener('click',evaluateCurExpression);
backspace.addEventListener('click',removeLastChar);
toggle.addEventListener('click',(e)=>{
    if(secondNumber!=='') return;
    let newFirst=newDisplay=Number(firstNumber)>0?'-':'';
    newFirst += Number(firstNumber)>0?firstNumber:firstNumber.slice(1);
    firstNumber = newFirst;
    newDisplay += Number(display.textContent)>0?display.textContent:display.textContent.slice(1);
    display.textContent = newDisplay;
});
const clear = document.querySelector('.clear');
clear.addEventListener('click',() =>{ 
    display.textContent='';
    firstNumber = '';
    secondNumber = '';
    curOperator = '';
    errorMsg.remove();
    display.style.transform = 'scaleX(1)';
}    
);

