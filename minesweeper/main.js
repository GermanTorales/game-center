import Game from "./game.js";

const grid = document.getElementById("grid");

const htmlTexts = {
  flags: document.getElementById("flags-left"),
};

const btns = {
  easy: document.getElementById("easy"),
  medium: document.getElementById("medium"),
  hard: document.getElementById("hard"),
  emoji: document.getElementById("emoji"),
};

const game = new Game(grid, htmlTexts, btns);

game.start();
