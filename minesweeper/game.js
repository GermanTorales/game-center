import { DIFFICULTIES } from "./constants.js";
import Board from "./board.js";

const timer = document.getElementById("timer");

export default class Game {
  board;

  constructor(grid, htmlTexts, btns) {
    this.rows = DIFFICULTIES.MEDIUM.rows;
    this.cols = DIFFICULTIES.MEDIUM.cols;
    this.blockSize = DIFFICULTIES.MEDIUM.blockSize;
    this.difficulty = DIFFICULTIES.MEDIUM.level;
    this.buttons = btns;
    this.grid = grid;
    this.flags = htmlTexts.flags;
    this.gameOver = false;
    this.timer = null;
    this.timerSeconds = 0;
  }

  start() {
    this.drawBoard();
    this.setEvents();

    this.gameOver = false;
    this.seconds = 0;
  }

  drawBoard() {
    if (this.board) {
      this.board.grid.innerHTML = "";
      this.board = null;
    }

    this.board = new Board(this.rows, this.cols, this.blockSize, this.difficulty, this.grid);
    this.board.init(this.flags);
  }

  initTimer() {
    this.timer = setInterval(() => {
      this.seconds += 1;

      timer.innerText = this.seconds;
    }, 1000);
  }

  finishTimer() {
    clearInterval(this.timer);

    this.timer = null;
  }

  over() {
    this.finishTimer();
    this.board.showAllBoard();
    this.gameOver = true;
  }

  setEvents() {
    this.buttons.emoji.addEventListener("click", this.handleRestart.bind(this));
    this.buttons.easy.addEventListener("click", this.setDifficulty.bind(this));
    this.buttons.medium.addEventListener("click", this.setDifficulty.bind(this));
    this.buttons.hard.addEventListener("click", this.setDifficulty.bind(this));

    this.board.grid.addEventListener("click", this.handleClick.bind(this));
    this.board.grid.addEventListener("mousedown", this.handleFlags.bind(this));
    this.board.grid.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  handleClick(event) {
    if (this.gameOver) return;

    if (this.timer === null) this.initTimer();

    const { x, y } = this.getCleanPosition(event.target.id);
    const isMine = this.board.checkForMines(x, y);

    if (isMine) {
      this.board.discoverBomb(x, y);
      this.over();
    } else {
      this.board.showArea(x, y);
    }
  }

  handleFlags(event) {
    if (this.gameOver) return;

    if (event.button === 2) {
      if (event.target.classList.contains("flag")) {
        const { x, y } = this.getCleanPosition(event.target.parentNode.id);

        this.board.removeFlag(x, y);
      } else {
        const { x, y } = this.getCleanPosition(event.target.id);

        this.board.addFlag(x, y);
      }
    }
  }

  handleRestart() {
    this.finishTimer();
    this.start();
  }

  setDifficulty(event) {
    const difficulty = event.target.id.toUpperCase();

    this.rows = DIFFICULTIES[difficulty].rows;
    this.cols = DIFFICULTIES[difficulty].cols;
    this.blockSize = DIFFICULTIES[difficulty].blockSize;
    this.difficulty = DIFFICULTIES[difficulty].level;

    this.start();
  }

  getCleanPosition(id) {
    const [x, y] = id.split("-");

    return {
      x: parseInt(x),
      y: parseInt(y),
    };
  }
}
