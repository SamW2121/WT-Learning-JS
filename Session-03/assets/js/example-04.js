/**
 * Simple Calculator
 *
 *
 *
 */

/* Create a calculator object that tells us everything about an expression
 * displayValue
 *              holds a string value that represents the input of the user
 *              or the result of an operation. It’s how we keep track of what
 *              should be displayed on the screen.
 * firstOperand
 *              will store the first operand for any expression. It’s set to
 *              null for now.
 * operator
 *              will store the operator for an expression. Its initial value
 *              is also null.
 * waitingForSecondOperand
 *              essentially serves as a way to check if both the first
 *              operand and the operator have been inputted. If it’s true, the
 *              next numbers that the user enters will constitute the second
 *              operand.
 */
const calculator = {
    displayValue : '0',
    firstOperand : null,
    waitingForSecondOperand : false,
    operator : null
}

function updateDisplay() {
    // select the element with class of `calculator-screen`
    const display = document.getElementById( 'CalculatorScreen' );
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector( '.calculator-keys' );
/*
 * Here we are listening for a click event on the element with a class of
 * calculator-keys.
 *
 * Since all the keys on the calculator are children of this element, the
 * click event filters down to them too. This is known as event delegation.
 */
keys.addEventListener( 'click', ( event ) => {
    // Access the clicked element by destructuring the event
    // const target = event.target is another way to do this
    const { target } = event;
    const { value } = target;
    if ( !target.matches( 'button' ) ) {
        return;
    }

    switch ( value ) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator( value );
            break;
        case '.':
            inputDecimal( value );
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // check if the key is an integer
            if ( Number.isInteger( parseFloat( value ) ) ) {
                inputDigit( value );
            }
    }

    updateDisplay();
} );

function inputDigit( digit ) {
    // const { displayValue } = calculator;
    // // Overwrite `displayValue` if the current value is '0' otherwise append to it
    // calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    // console.log(calculator);

    const { displayValue, waitingForSecondOperand } = calculator;

    if ( waitingForSecondOperand === true ) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log( calculator );
}

function inputDecimal( dot ) {
    if ( calculator.waitingForSecondOperand === true ) {
        calculator.displayValue = '0' + dot
        calculator.waitingForSecondOperand = false;
        return
    }
    // If the `displayValue` property does not contain a decimal point
    if ( !calculator.displayValue.includes( dot ) ) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}


function handleOperator( nextOperator ) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator
    // `parseFloat` converts the string contents of `displayValue`
    // to a floating-point number
    const inputValue = parseFloat( displayValue );

    if ( operator && calculator.waitingForSecondOperand ) {
        calculator.operator = nextOperator;
        console.log( calculator );
        return;
    }

    // verify that `firstOperand` is null and that the `inputValue`
    // is not a `NaN` value
    if ( firstOperand === null && !isNaN( inputValue ) ) {
        // Update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if ( operator ) {
        const result = calculate( firstOperand, inputValue, operator );

        calculator.displayValue = `${ parseFloat( result.toFixed( 7 ) ) }`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log( calculator );
}


function calculate( firstOperand, secondOperand, operator ) {
    if ( operator === '+' ) {
        return firstOperand + secondOperand;
    } else if ( operator === '-' ) {
        return firstOperand - secondOperand;
    } else if ( operator === '*' ) {
        return firstOperand * secondOperand;
    } else if ( operator === '/' ) {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}


function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log( calculator );
}
