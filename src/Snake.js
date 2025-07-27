import { CELL, DIRECTION } from "./Enums";

class Snake {
  constructor({ grid, food }, gameOver) {
    this.gameOver = gameOver;
    this.grid = grid;
    this.food = food;
    this.colLength = this.grid.get().length;
    this.rowLength = this.grid.get()[0].length;
    this.direction = DIRECTION.RIGHT;
    this.initLength = 3;
    this.lastInputDirection = null;
    this.spawn();
  }

  initSnake() {
    const grid = this.grid.get();
    const row = Math.floor(grid.length / 2);
    return Array(this.initLength)
      .fill()
      .map((_, idx) => ({ x: row, y: idx + 1 }));
  }

  spawn() {
    this.location = this.initSnake();
    this.location.forEach(({ x, y }) => {
      this.grid.setCellState(CELL.SNAKE, x, y);
    });
  }

  getLength() {
    return this.location?.length - this.initLength || 0;
  }

  getNewHead() {
    const [dx, dy] = this.direction;
    const head = this.location.at(-1);
    return {
      x: (head.x + dx + this.colLength) % this.colLength,
      y: (head.y + dy + this.rowLength) % this.rowLength,
    };
  }

  shrink() {
    const backLocation = this.location[0];
    this.location.shift();
    this.grid.setCellState(CELL.EMPTY, backLocation.x, backLocation.y);
  }

  grow(newHead) {
    this.location.push(newHead);
    this.grid.setCellState(CELL.SNAKE, newHead.x, newHead.y);
  }

  checkCollision({ x, y }) {
    return this.grid.get()[x][y] === CELL.SNAKE;
  }

  updateDirection() {
    if (this.lastInputDirection) {
      if (!this.isOpposite(this.lastInputDirection)) {
        this.direction = this.lastInputDirection;
      }
      this.lastInputDirection = null;
    }
  }

  inputDirection(direction) {
    if (!this.isOpposite(direction)) {
      this.lastInputDirection = direction;
    }
  }

  isOpposite(direction) {
    return (
      direction[0] === -this.direction[0] && direction[1] === -this.direction[1]
    );
  }
}

export default Snake;
