import { BLOCK_COLORS, DIRECTIONS, ICONS } from "./constants.js";

export default class Board {
  flagsElement;

  constructor(rows, cols, blockSize, difficulty, grid) {
    this.rows = rows;
    this.cols = cols;
    this.blockSize = blockSize;
    this.mines = Math.floor(rows * cols * difficulty);
    this.flagsAvailable = this.mines;
    this.cells = [];
    this.grid = grid;
  }

  init(flagsElement) {
    this.drawBoard();
    this.addMines();
    this.countMinesAround();

    this.setFlagsElement(flagsElement);
  }

  drawBoard() {
    this.grid.style.width = `${this.rows * this.blockSize + this.blockSize}px`;

    for (let row = 0; row < this.rows; row++) {
      const rowDiv = document.createElement("div");

      this.grid.appendChild(rowDiv);

      this.cells[row] = [];

      for (let col = 0; col < this.cols; col++) {
        const colDiv = document.createElement("div");
        colDiv.className = "block";
        colDiv.id = `${row}-${col}`;

        rowDiv.appendChild(colDiv);

        this.cells[row][col] = { div: colDiv, row, col, minesAround: 0, isMine: false, isRevealed: false, isFlagged: false };
      }
    }
  }

  addMines() {
    for (let i = 0; i < this.mines; i++) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomCol = Math.floor(Math.random() * this.cols);

      //TODO: Validar que la posición no tenga una mina

      this.cells[randomRow][randomCol].isMine = true;
    }
  }

  countMinesAround() {
    this.cells.forEach((rows, x) => {
      rows.forEach((block, y) => {
        if (!block.isMine) {
          block.minesAround = 0;

          const neighbours = this.getNeighbours(x, y);

          neighbours.forEach((neighbour) => {
            if (neighbour?.isMine) block.minesAround++;
          });
        }
      });
    });
  }

  setFlagsElement(element) {
    this.flagsElement = element;
    this.flagsElement.innerText = this.mines;
  }

  addFlag(row, col) {
    const block = this.getBlock(row, col);

    if (!block || block.isFlagged || block.isRevealed) return;

    block.isFlagged = true;
    this.flagsAvailable -= 1;
    this.flagsElement.innerText = this.flagsAvailable;

    const img = document.createElement("img");

    img.className = "flag";
    img.src = ICONS.FLAG;
    img.style.width = `${this.blockSize - 10}px`;
    img.style.height = `${this.blockSize - 10}px`;

    this.cells[row][col].div.appendChild(img);
    this.cells[row][col].div.style.backgroundColor = "";
  }

  removeFlag(row, col) {
    const block = this.getBlock(row, col);

    if (!block || !block.isFlagged) return;

    block.isFlagged = false;
    this.flagsAvailable += 1;
    this.flagsElement.innerText = this.flagsAvailable;
    this.cells[row][col].div.removeChild(this.cells[row][col].div.childNodes[0]);
  }

  getBlock(x, y) {
    return this.cells?.[x]?.[y];
  }

  getNeighbours(x, y) {
    return DIRECTIONS.reduce((acc, { dx, dy }) => {
      const newX = parseInt(x) + dx;
      const newY = parseInt(y) + dy;

      if (newX >= 0 && newX < this.rows && newY >= 0 && newY < this.cols) {
        acc.push(this.getBlock(newX, newY));
      }

      return acc;
    }, []);
  }

  checkForMines(row, col) {
    const cell = this.getBlock(row, col);

    if (!cell || cell.isFlagged || !cell.isMine) return false;

    return true;
  }

  showArea(row, col) {
    const clickedBlock = this.getBlock(row, col);

    if (clickedBlock.isRevealed || clickedBlock.isFlagged) return;

    this.discoverBlock(row, col);

    if (clickedBlock.minesAround) return;

    const neighbours = this.getNeighbours(row, col);

    neighbours.forEach((cell) => {
      if (cell.isMine || cell.isRevealed || cell.isFlagged) return;

      if (cell.minesAround === 0) {
        this.showArea(cell.row, cell.col);
      } else if (cell.minesAround) {
        cell.div.innerText = cell.minesAround;
      }

      this.discoverBlock(cell.row, cell.col);
    });
  }

  discoverBomb(x, y) {
    const img = document.createElement("img");

    img.className = "mine";
    img.src = ICONS.MINE;
    img.style.width = `${this.blockSize - 10}px`;
    img.style.height = `${this.blockSize - 10}px`;

    this.cells[x][y].isRevealed = true;
    this.cells[x][y].div.appendChild(img);
  }

  discoverBlock(x, y) {
    this.cells[x][y].isRevealed = true;
    this.cells[x][y].div.innerText = this.cells[x][y].minesAround;
    this.cells[x][y].div.classList.add("discovered");
    this.cells[x][y].div.classList.add(BLOCK_COLORS[this.cells[x][y].minesAround]);
  }

  showAllBoard() {
    this.cells.forEach((rows) => {
      rows.forEach((block) => {
        if (block.isRevealed) return;
        if (block.isFlagged) return;

        if (block.isMine) this.discoverBomb(block.row, block.col);
        else this.discoverBlock(block.row, block.col);
      });
    });
  }
}
