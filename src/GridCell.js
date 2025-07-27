import "./styles.css";

const GridCell = ({ cellState }) => {
  return <div className={`gridCell ${cellState}`}></div>;
};

export default GridCell;
