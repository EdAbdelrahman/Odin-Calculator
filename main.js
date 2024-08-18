// Start of DOMContentLoaded event listener (beginning of the scope)
document.addEventListener('DOMContentLoaded', function() {

    // All variables and functions here are within this scope

    let clear = document.querySelector('#clear-btn');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    let previousValue = '';
    let currentValue = '';
    let operator = null;

    // Handling number buttons
    numbers.forEach(number => number.addEventListener('click', function(e) {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    // Handling operator buttons
    operators.forEach(op => op.addEventListener('click', function(e) {
        handleOperator(e.target.textContent);
        previousScreen.textContent = `${previousValue} ${operator}`;
        currentScreen.textContent = currentValue;
    }));

    // Handling equal button
    equal.addEventListener('click', function() {
        if (previousValue && currentValue && operator) {
            calculate();
            previousScreen.textContent = '';
            currentScreen.textContent = previousValue;
            currentValue = '';
            operator = null;
        }
    });

    // Handling decimal button
    decimal.addEventListener('click', function() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            currentScreen.textContent = currentValue;
        }
    });

    // Handling clear button
    clear.addEventListener('click', function() {
        previousValue = '';
        currentValue = '';
        operator = null;
        previousScreen.textContent = '';
        currentScreen.textContent = '';
    });

    // Function to handle number button clicks
    function handleNumber(num) {
        currentValue += num;
    }

    // Function to handle operator button clicks
    function handleOperator(op) {
        if (currentValue === '') return;
        if (previousValue !== '') {
            calculate();
        }
        operator = op;
        previousValue = currentValue;
        currentValue = '';
    }

    // Function to perform the calculation
    function calculate() {
        previousValue = parseFloat(previousValue);
        currentValue = parseFloat(currentValue);

        if (operator === '+') {
            previousValue += currentValue;
        } else if (operator === '-') {
            previousValue -= currentValue;
        } else if (operator === 'x') {
            previousValue *= currentValue;
        } else if (operator === '/') {
            if (currentValue !== 0) {
                previousValue /= currentValue;
            } else {
                alert("Error! Division by zero.");
                previousValue = '';
                currentValue = '';
                operator = null;
            }
        }

        previousValue = previousValue.toString();
        currentValue = '';
    }

});
// End of DOMContentLoaded event listener (end of the scope)
