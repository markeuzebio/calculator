const display_value       = document.querySelector(".display");
const calculator_numbers  = document.querySelectorAll(".number");

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
    }
}

function updateDisplay(number) {
    if(display_value.textContent === "0")
        display_value.textContent = number;
    else
        display_value.textContent += number;
}

calculator_numbers.forEach(function (calculator_number) {
    calculator_number.addEventListener("click", () => updateDisplay(calculator_number.textContent));
});