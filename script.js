const display_value       = document.querySelector(".display");
const btn_numbers         = document.querySelectorAll(".number");
const btn_backspace       = document.querySelector("#backspace");
const btn_clear           = document.querySelector("#clear");
const btn_operators       = document.querySelectorAll(".operator");
const btn_equality        = document.querySelector("#equality");
const btn_dot             = document.querySelector("#dot");

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
    return a / b;
}

function remainder(a, b)
{
    return a % b;
}

function operate(a, operator, b)
{
    let result;

    switch(operator)
    {
        case '+':
            result = add(a, b);
        break;

        case '-':
            result = subtract(a, b);
        break;

        case '*':
            result = multiply(a, b);
        break;

        case '/':
            if(b == 0)
                result = NaN;

            result = divide(a, b);
        break;

        case '%':
            if(b == 0)
                result = NaN;

            result = remainder(a, b);
        break;
    }

    return Math.round(result * 10) / 10;
}

// Returns true if it's ok, false otherwise
function checkDisplay()
{
    return String(getDisplayValue()).length <= 16 ? true : false;
}

function addNumberDisplay(number)
{
    if(op_btn_pressed)
    {
        clearDisplay();
        op_btn_pressed = false;
    }
    
    if(!checkDisplay())
        return;

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

function calculateOperation()
{
    return operate(expression[0], expression[1], expression[2]);
}

function calculateExpression()
{
    // Just calculates if there's an expression to.
    if(expression[0] != undefined && expression[1] != undefined)
    {
        expression.push(getDisplayValue());
        display_value.textContent = calculateOperation();
        expression = [];
        op_btn_pressed = true;
    }
}

function buildExpression(operator)
{
    // There's an expression waiting to be calculated already.
    if(expression[0] != undefined)
    {
        let expression_result;

        // Calculate intermediate value 
        expression.push(getDisplayValue());
        expression_result = calculateOperation();
        display_value.textContent = expression_result;

        expression = [];
        expression.push(expression_result, operator);
    }
    else
        expression.push(getDisplayValue(), operator);

    op_btn_pressed = true;
}

function addDotDisplay()
{
    if(!checkDisplay())
        return;

    if(display_value.textContent.match(/\./) === null)
        display_value.textContent += '.';
}

// Update display based on number clicked on calculator
btn_numbers.forEach(function (btn_number) {
    btn_number.addEventListener("click", () => addNumberDisplay(btn_number.textContent))
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
    btn_operator.addEventListener("click", () => buildExpression(btn_operator.textContent));
})

btn_equality.addEventListener("click", calculateExpression);

// ---------------- EXTRAS ---------------- //
btn_dot.addEventListener("click", addDotDisplay);

document.addEventListener("keydown", function (event) {
    if(event.code.match(/Digit[0-9]/) && event.shiftKey == false)
        addNumberDisplay(event.key);
    else if(event.code === "Period")
        addDotDisplay();
    else if(event.code === "Backspace")
        removeLastNumberDisplay();
    else if(event.key.match(/\+|\-|\*|\/|\%/))
        buildExpression(event.key);
    else if(event.key === "=")
        calculateExpression();
});