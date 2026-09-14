import { MESSAGES } from "../lang/messages/en/user.js";

export class AppController {
    constructor(ui, game) {
        this.ui = ui;
        this.game = game;
        this.ui.goButton.addEventListener("click", () => this.startGame());
    }

    startGame() {
        const number = this.ui.getNumber();

        if (!Number.isInteger(number) || number < 3 || number > 7) {
            this.ui.showMessage(MESSAGES.invalidInput);
            return;
        }

        this.game.start(number);
    }
}
