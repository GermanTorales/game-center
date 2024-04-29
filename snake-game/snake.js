import { DIRECTIONS } from "./constants.js";

export default class Snake {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.body = [];
    this.direction = DIRECTIONS.ArrowRight;
    this.isEating = false;
  }

  init() {
    this.body = [{ x: 10, y: 10 }];
    this.draw();
  }

  draw() {
    this.body.forEach((cell) => {
      this.ctx.fillStyle = "#333333";
      this.ctx.strokeStyle = "#88AF7E";
      this.ctx.lineWidth = 4;
      this.ctx.fillRect(cell.x * this.size, cell.y * this.size, this.size, this.size);
      this.ctx.strokeRect(cell.x * this.size, cell.y * this.size, this.size, this.size);
    });
  }

  move(board) {
    const head = { x: this.body[0].x, y: this.body[0].y };

    if (this.direction === DIRECTIONS.ArrowRight) {
      head.x++;
    } else if (this.direction === DIRECTIONS.ArrowLeft) {
      head.x--;
    } else if (this.direction === DIRECTIONS.ArrowUp) {
      head.y--;
    } else if (this.direction === DIRECTIONS.ArrowDown) {
      head.y++;
    }

    this.body.unshift(head);
    const lastElement = this.body.pop();

    board.updateCell(lastElement);
  }

  eat(game) {
    const head = this.body[0];
    const food = game.food.food;

    if (head.x === food.x && head.y === food.y) this.isEating = true;
  }

  grow() {
    const tail = this.body[this.body.length - 1];

    this.body.push(tail);
  }

  setDirection(key) {
    const newDirection = DIRECTIONS[key];

    if (!newDirection) return;

    const oppositeDirections = {
      [DIRECTIONS.ArrowUp]: DIRECTIONS.ArrowDown,
      [DIRECTIONS.ArrowDown]: DIRECTIONS.ArrowUp,
      [DIRECTIONS.ArrowLeft]: DIRECTIONS.ArrowRight,
      [DIRECTIONS.ArrowRight]: DIRECTIONS.ArrowLeft,
    };

    if (newDirection !== oppositeDirections[this.direction]) this.direction = newDirection;
  }

  hasCollided(board) {
    const head = this.body[0];

    return head.x < 0 || head.x >= board.cols || head.y < 0 || head.y >= board.rows || this.checkBodyCollision();
  }

  checkBodyCollision() {
    const head = this.body[0];
    const [, ...body] = this.body.slice(1);

    return body.some((cell) => cell.x === head.x && cell.y === head.y);
  }

  isOnSnake(position) {
    return this.body.some((cell) => cell.x === position.x && cell.y === position.y);
  }

  delete() {
    this.body = [];
  }
}
