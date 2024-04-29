const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import Game from "./game.js";

const MODALS = {
  gameOver: document.getElementById("gameover"),
  gameDificulty: document.getElementById("difficulty"),
};

const BTNS = {
  gameStart: document.getElementById("start"),
  gameStop: document.getElementById("pause"),
  gameOverRestart: document.getElementById("restart-game"),
  gameDificulty: document.querySelectorAll(".btn-difficulty"),
};

const TEXT = {
  gameOverScore: document.getElementById("final-score"),
  gameScore: document.getElementById("score"),
};

const game = new Game(canvas, ctx, MODALS, BTNS, TEXT);

BTNS.gameStart.addEventListener("click", game.start.bind(game));
BTNS.gameOverRestart.addEventListener("click", game.reStart.bind(game));
BTNS.gameStop.addEventListener("click", game.stop.bind(game));

MODALS.gameDificulty.style.display = "flex";

BTNS.gameDificulty.forEach((btn) => {
  btn.addEventListener("click", () => {
    game.setDifficulty(btn.id);
    game.start();
  });
});
