import { useEffect, useState, useRef } from "react";
import { DIRECTION } from "./Enums";
import GridCell from "./GridCell";
import Grid from "./Grid";
import Food from "./Food";
import Snake from "./Snake";

const Game = ({ gridSize = 10, fps = 4 }) => {
  const delTime = 1000 / fps;
  const [startGame, setStartGame] = useState(false);
  const [, setTick] = useState(0);
  const gameRef = useRef();
  if (!gameRef.grid) {
    gameRef.grid = new Grid(gridSize);
  }
  if (!gameRef.food) {
    gameRef.food = new Food(gameRef.grid);
  }
  if (!gameRef.snake) {
    gameRef.snake = new Snake(gameRef);
  }
  const { grid, food, snake } = gameRef;

  const updateFrame = () => {
    snake.updateDirection();
    const newHead = snake.getNewHead();
    if (snake.checkCollision(newHead)) {
      gameRef.gameOver = true;
    }
    const foodEaten = food.checkFood(newHead);
    if (foodEaten) {
      food.spawn();
    } else {
      snake.shrink();
    }
    snake.grow(newHead);
  };

  const loop = (currTime) => {
    if (currTime - (gameRef.prevTime || 0) > delTime) {
      updateFrame();
      setTick((tick) => tick + 1);
      gameRef.prevTime = currTime;
    }
    if (!gameRef.gameOver) {
      gameRef.requestAnimationId = requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    if (startGame) {
      gameRef.requestAnimationId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(gameRef.requestAnimationId);
    }
  }, [startGame]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setStartGame(true);
      switch (e.key) {
        case "ArrowUp":
          snake.inputDirection(DIRECTION.UP);
          break;
        case "ArrowDown":
          snake.inputDirection(DIRECTION.DOWN);
          break;
        case "ArrowLeft":
          snake.inputDirection(DIRECTION.LEFT);
          break;
        case "ArrowRight":
          snake.inputDirection(DIRECTION.RIGHT);
          break;
        default:
          break;
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = (e) => {
      setStartGame(true);
      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;
      const touchEndY = touch.clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
          snake.inputDirection(DIRECTION.RIGHT);
        } else {
          snake.inputDirection(DIRECTION.LEFT);
        }
      } else {
        // Vertical swipe
        if (diffY > 0) {
          snake.inputDirection(DIRECTION.DOWN);
        } else {
          snake.inputDirection(DIRECTION.UP);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <h2>Score: {snake.getLength()}</h2>
      <div className="grid">
        {grid.get().map((row, rowId) => (
          <div className="row" key={`${rowId}`}>
            {row.map((cellState, colId) => (
              <GridCell
                key={`${rowId}_${colId}`}
                cellState={cellState}
                setCellState={(state) => grid.setCellState(state, rowId, colId)}
              />
            ))}
          </div>
        ))}
      </div>
      {!startGame && <h2>Press any key to start...</h2>}
      {gameRef.gameOver && <h2>Game Over...</h2>}
    </>
  );
};

export default Game;
