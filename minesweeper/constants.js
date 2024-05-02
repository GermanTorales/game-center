export const DIRECTIONS = [
  { dx: -1, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 1, dy: 1 },
];

export const BLOCK_COLORS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export const DIFFICULTIES = {
  EASY: { rows: 8, cols: 8, level: 0.2, blockSize: 40 },
  MEDIUM: { rows: 16, cols: 16, level: 0.5, blockSize: 40 },
  HARD: { rows: 30, cols: 30, level: 1, blockSize: 40 },
};

export const ICONS = {
  FLAG: "./icons/flag.png",
  MINE: "./icons/bomb.png",
};
