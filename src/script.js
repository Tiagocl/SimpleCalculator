function evaluateExpression(expression) {

    try {
        expression = expression.replace(/sin/g, 'Math.sin');
        const fn = new Function('return ' + expression);
        return fn();

        // Use the Function constructor to create a function from the expression

        // Execute the function and return the result

    } catch (error) {
        // Handle any errors that occur during evaluation
        console.error('Error evaluating expression:', error);
        return 'Error';
    }
}

function truncateResult(value) {
    const maxLength = 10; // Maximum number of characters to display
    if (value.length > maxLength) {
        return value.substring(0, maxLength - 1) + '...'; // Truncate and add ellipsis
    }
    return value;
}

function handleCalculator() {
    const text = document.querySelector('.result-container .text span');
    const result = document.querySelector('.result-container .result span');
    const buttons = document.querySelectorAll('.buttons button');
    let equal = '=';
    let resultValue = '';
    let textValue = '';


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '=') {
                resultValue = evaluateExpression(textValue);
                if (!isNaN(resultValue) && resultValue.toString().length > 9) {
                    console.log('resultValue', resultValue);
                    resultValue = parseFloat(resultValue).toFixed(9);
                }
                result.textContent = resultValue;
            }
            else if (button.textContent === 'Ac') {
                textValue = '';
                resultValue = '';
                text.textContent = textValue;
                result.textContent = resultValue;
                return;
            }
            else if (button.querySelector('svg')) {
                textValue = textValue.slice(0, -1);
                text.textContent = textValue;
            }

            else if (button.textContent === 'e') {
                textValue += Math.E;
                text.textContent = textValue;
            }
            else if (button.textContent === 'π') {
                textValue += Math.PI;
                text.textContent = textValue;
            }
            else if (button.textContent === 'sin') {
                textValue += 'sin(';
                text.textContent = textValue;
            }
            else if (button.textContent === ')') {
                textValue += ')';
                text.textContent = textValue;
            }
            else {
                textValue += button.textContent;
                text.textContent = textValue;
            }


        });
    });
}

handleCalculator();