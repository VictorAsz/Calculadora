$(document).ready(function () {
    let currentValue = '';
    const elementos = currentValue.split(/[\+\-\*\/]/);

    $('.digit').on('click', function () {
        const digitValue = $(this).text();
        appendValue(digitValue);
    });
    $('.operator').on('click', function () {

        const digitOperator = $(this).text();
        
        function isLastCharacterOperator(expression) {
            return /[\+\-\*\/]$/.test(expression);
        }

        if (!isLastCharacterOperator(currentValue)) {
            appendValue(digitOperator);
        }
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
        currentValue = '';
        updateScreen();
        console.log(memory)
        console.log(operators)
    }

    function appendValue(value) {
        currentValue += value;
        updateScreen();
    }


    function updateScreen() {
        $('#screen').val(currentValue);
        console.log(joinValuesAndOperators())
    }
    
    function validateExpression(expression){

            expression = expression.replace(/÷/g, '/');
            expression = expression.replace(/×/g, '*');
            expression = expression.replace(/[^0-9+\-*\/.()]/g, '');
            return expression
          
    }


    function performCalculation() {
        
        currentValue = validateExpression(currentValue);
        currentValue = eval(currentValue);
        updateScreen();
    }
    

});