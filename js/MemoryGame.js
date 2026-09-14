import { MESSAGES } from "../lang/messages/en/user.js";
import { GameButton } from "./GameButton.js";

export class MemoryGame {
    constructor(ui) {
        this.ui = ui;
        this.buttons = [];
        this.currentNumber = 1;
        this.totalButtons = 0;
    }

    start(number) {
        this.ui.clearGame();
        this.ui.showMessage("");
        this.buttons = [];
        this.currentNumber = 1;
        this.totalButtons = number;

        this.createButtons();
        setTimeout(() => this.scrambleButtons(0), number * 1000);
    }

    createButtons() {
        let x = 0;
        let y = 0;

        for (let number = 1; number <= this.totalButtons; number++) {
            const button = new GameButton(number);
            this.buttons.push(button);
            this.ui.addButton(button);

            if (x + button.element.offsetWidth > window.innerWidth) {
                x = 0;
                y += button.element.offsetHeight;
            }

            button.move(x, y);
            x += button.element.offsetWidth;
        }
    }

    scrambleButtons(timesMoved) {
        this.moveButtonsRandomly();

        if (timesMoved + 1 === this.totalButtons) {
            this.startGuessing();
            return;
        }

        setTimeout(() => this.scrambleButtons(timesMoved + 1), 2000);
    }

    moveButtonsRandomly() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const gameTop = this.ui.gameArea.getBoundingClientRect().top;

        for (const button of this.buttons) {
            const maxX = Math.max(0, windowWidth - button.element.offsetWidth);
            const maxY = Math.max(0, windowHeight - gameTop - button.element.offsetHeight);
            const x = Math.floor(Math.random() * (maxX + 1));
            const y = Math.floor(Math.random() * (maxY + 1));

            button.move(x, y);
        }
    }

    startGuessing() {
        for (const button of this.buttons) {
            button.hideNumber();
            button.enable();
            button.element.onclick = () => this.checkButton(button);
        }
    }

    checkButton(button) {
        if (button.number !== this.currentNumber) {
            this.ui.showMessage(MESSAGES.wrongOrder);
            this.showAllNumbers();
            this.disableAllButtons();
            return;
        }

        button.showNumber();
        button.disable();
        this.currentNumber++;

        if (this.currentNumber > this.totalButtons) {
            this.ui.showMessage(MESSAGES.excellent);
            this.disableAllButtons();
        }
    }

    showAllNumbers() {
        for (const button of this.buttons) {
            button.showNumber();
        }
    }

    disableAllButtons() {
        for (const button of this.buttons) {
            button.disable();
        }
    }
}
