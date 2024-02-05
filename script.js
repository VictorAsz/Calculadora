$(document).ready(function () {
    let memory = [];
    let operators = [];
    let currentValue = '';

    $('.digit').on('click', function () {
        const digitValue = $(this).text();
        appendValue(digitValue);
    });
    $('.operator').on('click', function () {
        const digitOperator = $(this).text();
        appendOperator(digitOperator);
        
    });

    $('#equal').on('click', function () {
        performCalculation()
    })

    $('#clear').on('click', function () {
        clearMemory();
    })

    $('#backspace').on('click', function () {
        backspace();
    });

    function backspace() {
        currentValue = currentValue.slice(0, -1);
        updateScreen();
    }

    function clearMemory() {
        memory = [];
        operators = [];
        currentValue = '';
        updateScreen();
        console.log(memory)
        console.log(operators)
    }


    function appendValue(value) {
        currentValue += value;
        updateScreen();
    }


    function appendOperator(operator) {
        memory.push(parseFloat(currentValue));
        operators.push(operator);
        
        currentValue = '';
        updateScreen();
        console.log(memory)
        console.log(operators)
    }

    function updateScreen() {
        $('#screen').val(currentValue);
        console.log(joinValuesAndOperators())
    }

    function joinValuesAndOperators() {
        const resultArray = [];
        for (let i = 0; i < memory.length; i++) {
            resultArray.push(memory[i]);
            if (i < operators.length) {
                resultArray.push(operators[i]);
            }
        }
        return resultArray;
    }
    
    function performCalculation() {
        memory.push(parseFloat(currentValue));
    
        let result = memory[0];
        for (let i = 0; i < operators.length; i++) {
            const nextNumber = memory[i + 1];
    
            switch (operators[i]) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '×':
                    result *= nextNumber;
                    break;
                case '÷':
                    if (nextNumber !== 0) {
                        result /= nextNumber;
                    } else {
                        alert("Error: Division by zero");
                        clearMemory();
                        return;
                    }
                    break;
                default:
                    break;
            }
        }
    
        clearMemory();
        currentValue = result;
        updateScreen();
    }
    
});