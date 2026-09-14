export class GameButton {
    constructor(number) {
        this.number = number;
        this.element = document.createElement("button");
        this.element.className = "gameButton";
        this.element.textContent = number;
        this.element.disabled = true;
        this.element.style.backgroundColor = this.getRandomColor();
    }

    getRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    move(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    showNumber() {
        this.element.textContent = this.number;
    }

    hideNumber() {
        this.element.textContent = "";
    }

    enable() {
        this.element.disabled = false;
    }

    disable() {
        this.element.disabled = true;
    }
}
