$(document).ready(function () {
    const calculator = {
        currentValue: '',

        init: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            $('.digit').on('click',
                (event) => this.appendDigit($(event.target).text()));
            $('.operator').on('click',
                (event) => this.appendOperator($(event.target).text()));
            $('#equal').on('click',
                () => this.performCalculation());
            $('#clear').on('click',
                () => this.clearMemory());
            $('#backspace').on('click',
                () => this.backspace());
        },

        appendDigit: function (digit) {
            if (digit === '.' && !this.endsWithNumber(this.currentValue)) {
                return;
            }
            this.currentValue += digit;
            this.updateScreen();
        },

        appendOperator: function (operator) {
            if (!this.endsWithOperator(this.currentValue)) {
                this.currentValue += operator;
                this.updateScreen();
            }
        },

        performCalculation: function () {
            try {
                this.currentValue = this.validateExpression(this.currentValue);

                if (this.containsDivisionByZero(this.currentValue)) {
                    throw new Error('Divisão por zero não é permitida.');
                }

                this.currentValue = eval(this.currentValue);
                this.updateScreen();
            } catch (error) {
                alert('Erro ao calcular a expressão');
            }

            
        },

        backspace: function () {
            this.currentValue = this.currentValue.slice(0, -1);
            this.updateScreen();
        },

        clearMemory: function () {
            this.currentValue = '';
            this.updateScreen();
        },

        updateScreen: function () {
            $('#screen').val(this.currentValue);
        },

        validateExpression: function (expression) {
            expression = expression.replace(/÷/g, '/');
            expression = expression.replace(/×/g, '*');
            expression = expression.replace(/[^0-9+\-*\/.()]/g, '');
            return expression;
        },

        endsWithOperator: function (expression) {
            return /[\+\-\*\/]$/.test(expression);
        },

        endsWithNumber: function (expression) {
            return /[0-9]$/.test(expression);
        },

        containsDivisionByZero: function (expression) {
          
            return /\b\/\s*0\b/.test(expression);
        }
        
    };

 
    calculator.init();
});