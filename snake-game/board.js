export default class Board {
  constructor(ctx, dificultyConfig) {
    this.ctx = ctx;
    this.width = dificultyConfig.width;
    this.height = dificultyConfig.height;
    this.blockSize = dificultyConfig.blockSize;
    this.rows = this.width / this.blockSize;
    this.cols = this.height / this.blockSize;
    this.grid = [];

    this.init();
  }

  init() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({
        value: 0,
        changed: true,
      }))
    );
  }

  draw() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.grid[row][col];

        if (cell.changed) {
          this.ctx.fillStyle = "#7FA077";
          this.ctx.strokeStyle = "#88AF7E";
          this.ctx.lineWidth = 4;
          this.ctx.fillRect(col * this.blockSize, row * this.blockSize, this.blockSize, this.blockSize);
          this.ctx.strokeRect(col * this.blockSize, row * this.blockSize, this.blockSize, this.blockSize);
          cell.changed = false;
        }
      }
    }
  }

  updateCell(position) {
    const cell = this.grid[position.y][position.x];

    cell.changed = true;
  }
}
