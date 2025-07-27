import "./styles.css";
import { CELL } from "./Enums";

const GridCell = ({ cellState }) => {
  const getBgColor = () => {
    if (cellState === CELL.EMPTY) {
      return "white";
    }
    if (cellState === CELL.SNAKE) {
      return "black";
    }
    if (cellState === CELL.FOOD) {
      return "red";
    }
  };

  return <div className={`gridCell ${getBgColor()}`}></div>;
};

export default GridCell;
