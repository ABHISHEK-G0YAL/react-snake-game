import "./styles.css";
import Game from "./Game";

export default function App() {
  return (
    <>
      <div className="App">
        <h1>Snake Game</h1>
        <Game gridSize={35} fps={12} />
      </div>
    </>
  );
}
