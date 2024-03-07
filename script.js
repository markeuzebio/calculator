const display_value       = document.querySelector(".display");
const btn_numbers         = document.querySelectorAll(".number");
const btn_backspace       = document.querySelector("#backspace");
const btn_clear           = document.querySelector("#clear");
const btn_operators       = document.querySelectorAll(".operator");
const btn_equality        = document.querySelector("#equality");

let expression     = [];
let op_btn_pressed = false;

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return Math.round(a / b * 10) / 10;
}

function remainder(a, b)
{
    return a % b;
}

function operate(a, operator, b)
{
    switch(operator)
    {
        case '+':
            return add(a, b);
        break;

        case '-':
            return subtract(a, b);
        break;

        case '*':
            return multiply(a, b);
        break;

        case '/':
            if(b == 0)
                return NaN;

            return divide(a, b);
        break;

        case '%':
            if(b == 0)
                return NaN;

            return remainder(a, b);
        break;
    }
}

function addNumberDisplay(number)
{
    if(display_value.textContent === "0")
        display_value.textContent = number;
    else
        display_value.textContent += number;
}

function removeLastNumberDisplay()
{
    if(display_value.textContent !== "0")
    {
        display_value.textContent = display_value.textContent.slice(0, -1);

        if(display_value.textContent.length == 0)
            display_value.textContent = 0;
    }
}

function clearDisplay()
{
    display_value.textContent = 0;
}

function getDisplayValue()
{
    return Number(display_value.textContent);
}

function calculateExpression()
{
    return operate(expression[0], expression[1], expression[2]);
}

// Update display based on number clicked on calculator
btn_numbers.forEach(function (btn_number) {
    btn_number.addEventListener("click", function () {
        if(op_btn_pressed)
        {
            clearDisplay();
            op_btn_pressed = false;
        }

        addNumberDisplay(btn_number.textContent);
    })
});

// Pop the last number written on display
btn_backspace.addEventListener("click", removeLastNumberDisplay);

// Clear the display
btn_clear.addEventListener("click", function () {
    clearDisplay(); 
    expression = [];
});

// For all operators clicked on calculator, update the expression
btn_operators.forEach(function (btn_operator) {
    btn_operator.addEventListener("click", function () {
        // There's an expression waiting to be calculated already.
        if(expression[0] != undefined)
        {
            let expression_result;

            // Calculate intermediate value 
            expression.push(getDisplayValue());
            expression_result = calculateExpression();
            display_value.textContent = expression_result;

            expression = [];
            expression.push(expression_result, btn_operator.textContent);
        }
        else
            expression.push(getDisplayValue(), btn_operator.textContent);

        op_btn_pressed = true;
    });
})

btn_equality.addEventListener("click", function () {
    // Just calculates if there's an expression to.
    if(expression[0] != undefined && expression[1] != undefined)
    {
        expression.push(getDisplayValue());
        display_value.textContent = calculateExpression();
        expression = [];
        op_btn_pressed = true;
    }
});