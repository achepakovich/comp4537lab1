import { MESSAGES } from "../lang/messages/en/users.js";

const numberInput = document.getElementById("numberInput");
const goButton = document.getElementById("goButton");
const numberLabel = document.getElementById("numberLabel");
const message = document.getElementById("message");
const gameArea = document.getElementById("gameArea");

let buttons = [];
let currentNumber = 1;
let totalButtons = 0;

numberLabel.textContent = MESSAGES.inputLabel;
goButton.textContent = MESSAGES.goButton;

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function showMessage(text) {
    message.textContent = text;
}

function clearGameArea() {
    gameArea.innerHTML = "";
}

function moveButton(button, x, y) {
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

function makeButton(value) {
    const button = document.createElement("button");
    button.className = "gameButton";
    button.textContent = "";
    button.dataset.number = value;
    button.disabled = true;
    button.style.backgroundColor = randomColor();
    return button;
}

function disableAllButtons() {
    for (const button of buttons) {
        button.disabled = true;
    }
}

function showAllNumbers() {
    for (const button of buttons) {
        button.textContent = button.dataset.number;
    }
}

function startGuessing() {
    for (const button of buttons) {
        button.textContent = "";
        button.disabled = false;

        button.onclick = function () {
            const clickedNumber = Number(button.dataset.number);

            if (clickedNumber === currentNumber) {
                button.textContent = clickedNumber;
                button.disabled = true;
                currentNumber++;

                if (currentNumber > totalButtons) {
                    showMessage(MESSAGES.excellent);
                    disableAllButtons();
                }
            } else {
                showMessage(MESSAGES.wrongOrder);
                showAllNumbers();
                disableAllButtons();
            }
        };
    }
}

function scrambleButtons() {
    for (const button of buttons) {
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight - 30;
        const x = Math.floor(Math.random() * Math.max(1, maxX));
        const y = Math.floor(Math.random() * Math.max(1, maxY));

        moveButton(button, x, y);
    }

    setTimeout(startGuessing, 300);
}

function createButtons(amount) {
    let x = 0;
    let y = 0;

    for (let i = 1; i <= amount; i++) {
        const button = makeButton(i);
        buttons.push(button);
        gameArea.appendChild(button);

        const buttonWidth = button.offsetWidth;

        if (x + buttonWidth > window.innerWidth) {
            x = 0;
            y += button.offsetHeight;
        }

        moveButton(button, x, y);
        x += buttonWidth;
    }
}

function startGame() {
    const number = Number(numberInput.value);

    if (!Number.isInteger(number) || number < 3 || number > 7) {
        showMessage(MESSAGES.invalidInput);
        return;
    }

    clearGameArea();
    showMessage("");
    buttons = [];
    currentNumber = 1;
    totalButtons = number;

    createButtons(totalButtons);

    setTimeout(scrambleButtons, number * 1000);
}

goButton.addEventListener("click", startGame);