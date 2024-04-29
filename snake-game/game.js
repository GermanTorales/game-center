import Snake from "./snake.js";
import Board from "./board.js";
import Food from "./food.js";
import { DIFFICULTY, DIRECTIONS } from "./constants.js";

export default class Game {
  board;
  snake;
  food;
  snakeSpeed;
  difficulty;

  constructor(canvas, ctx, modals, btns, text) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.frameCount = 0;
    this.isRunning = false;
    this.modals = modals;
    this.btns = btns;
    this.text = text;
    this.animationFrameId = null;

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  start() {
    this.board = new Board(this.ctx, this.difficulty);
    this.snake = new Snake(this.ctx, this.difficulty.blockSize);
    this.food = new Food(this.ctx, this.difficulty.blockSize);

    this.canvas.width = this.board.width;
    this.canvas.height = this.board.height;

    this.modals.gameOver.style.display = "none";

    this.board.draw();
    this.snake.init();
    this.food.init(this.snake, this.board);
    this.isRunning = true;

    this.loop();
  }

  reStart() {
    this.modals.gameDificulty.style.display = "flex";
    this.modals.gameOver.style.display = "none";
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);

      this.animationFrameId = null;
      this.btns.gameStop.innerText = "Resume";
    } else {
      this.btns.gameStop.innerText = "Pause";
      this.loop();
    }
  }

  setDifficulty(difficulty) {
    this.difficulty = DIFFICULTY[difficulty];
    this.snakeSpeed = this.difficulty.speed;

    this.modals.gameDificulty.style.display = "none";
  }

  gameOver() {
    this.isRunning = false;

    this.modals.gameOver.style.display = "flex";
    this.text.gameOverScore.innerText = this.snake.body.length - 1;
    this.text.gameScore.innerText = 0;

    this.snake.delete();
    this.food.delete();
  }

  updateScore() {
    this.text.gameScore.innerText = this.snake.body.length - 1;
  }

  loop() {
    if (!this.isRunning) return;

    this.updateGameLogic();
    this.drawGame();

    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  updateGameLogic() {
    this.frameCount++;

    if (this.frameCount % this.snakeSpeed === 0) {
      this.snake.move(this.board);
      this.snake.eat(this);

      if (this.snake.isEating) {
        this.snake.isEating = false;
        this.snake.animationCounter = 0;
        this.food.food = this.food.randomPosition(this.snake, this.board);
        this.snake.grow();
        this.updateScore();
      }
    }

    if (this.snake.hasCollided(this.board)) this.gameOver();
  }

  drawGame() {
    this.board.draw();
    this.snake.draw();
    this.food.draw();
  }

  handleKeyPress(event) {
    const { key } = event;

    const handlers = {
      ArrowUp: this.snake.setDirection.bind(this.snake),
      ArrowDown: this.snake.setDirection.bind(this.snake),
      ArrowLeft: this.snake.setDirection.bind(this.snake),
      ArrowRight: this.snake.setDirection.bind(this.snake),
    };

    const handler = handlers[key];

    if (!handler) return;

    handler(key);
  }
}
