import { CELL } from "./Enums";

class Food {
  constructor(grid) {
    this.grid = grid;
    this.spawn();
  }

  tryFood() {
    const grid = this.grid.get();
    const x = Math.floor(Math.random() * grid.length);
    const y = Math.floor(Math.random() * grid.length);

    if (grid[x][y] === CELL.EMPTY) {
      return { x, y };
    }
    return this.tryFood();
  }

  spawn() {
    this.location = this.tryFood();
    this.grid.setCellState(CELL.FOOD, this.location.x, this.location.y);
  }

  checkFood({ x, y }) {
    return this.grid.get()[x][y] === CELL.FOOD;
  }
}

export default Food;
