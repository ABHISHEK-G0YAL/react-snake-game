import "./styles.css";
import Game from "./Game";

export default function App() {
  return (
    <>
      <div className="App">
        <h1>Snake Game</h1>
        <Game gridSize={15} fps={4} />
      </div>
    </>
  );
}
