import { MESSAGES } from "../lang/messages/en/user.js";

export class UserInterface {
    constructor() {
        this.input = document.getElementById("numberInput");
        this.goButton = document.getElementById("goButton");
        this.numberLabel = document.getElementById("numberLabel");
        this.message = document.getElementById("message");
        this.gameArea = document.getElementById("gameArea");

        document.title = MESSAGES.title;
        this.numberLabel.textContent = MESSAGES.inputLabel;
        this.goButton.textContent = MESSAGES.goButton;
    }

    getNumber() {
        return Number(this.input.value);
    }

    showMessage(text) {
        this.message.textContent = text;
    }

    clearGame() {
        this.gameArea.innerHTML = "";
    }

    addButton(button) {
        this.gameArea.appendChild(button.element);
    }
}
