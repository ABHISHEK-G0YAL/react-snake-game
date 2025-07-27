import { CELL } from "./Enums";

class Grid {
  constructor(gridSize = 10) {
    this.grid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(CELL.EMPTY));
  }

  setCellState = (state, r, c) => {
    this.grid[r][c] = state;
  };

  get() {
    return this.grid;
  }
}

export default Grid;
