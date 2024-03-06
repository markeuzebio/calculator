const display_value       = document.querySelector(".display");
const btn_numbers         = document.querySelectorAll(".number");
const btn_backspace       = document.querySelector("#backspace");
const btn_clear           = document.querySelector("#clear");

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

// Update display based on number clicked on calculator
btn_numbers.forEach(function (btn_number) {
    btn_number.addEventListener("click", () => addNumberDisplay(btn_number.textContent));
});

// Pop the last number written on display
btn_backspace.addEventListener("click", removeLastNumberDisplay);

// Clear the display
btn_clear.addEventListener("click", () => display_value.textContent = 0);