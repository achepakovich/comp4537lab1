import { AppController } from "./AppController.js";
import { MemoryGame } from "./MemoryGame.js";
import { UserInterface } from "./UserInterface.js";

const ui = new UserInterface();
const game = new MemoryGame(ui);
new AppController(ui, game);