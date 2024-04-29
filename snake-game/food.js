export default class Food {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.food = {};
  }

  init(snake, board) {
    this.food = this.randomPosition(snake, board);
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillStroke = "#000000";
    this.ctx.fillRect(this.food.x * this.size, this.food.y * this.size, this.size, this.size);
    this.ctx.strokeRect(this.food.x * this.size, this.food.y * this.size, this.size, this.size);
  }

  randomPosition(snake, board) {
    let position;

    let maxPosX = board.width / this.size;
    let maxPosY = board.height / this.size;

    do {
      position = {
        x: Math.floor(Math.random() * maxPosX),
        y: Math.floor(Math.random() * maxPosY),
      };
    } while (snake.isOnSnake(position));

    return position;
  }

  delete() {
    this.food = {};
  }
}
