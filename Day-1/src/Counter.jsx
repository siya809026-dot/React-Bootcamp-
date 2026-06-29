import { useState } from "react";

export default function Counter() {
  const [balls, setBalls] = useState(0);
  const [runs, setRuns] = useState(0);

  function handleHit() {
    let randomRuns = Math.floor(Math.random() * 7);
    setBalls(balls + 1);
    setRuns(runs + randomRuns);
  }

  function handleReset() {
    setBalls(0);
    setRuns(0);
  }

  return (
    <div>
      {/* Scoreboard */}
     <div style={{ backgroundColor: "black", color: "white", padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "white" }}>Balls: {balls}</h2>
        <h2 style={{ color: "white" }}>Runs: {runs}</h2>
      </div>

      {/* Buttons */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleHit} disabled={balls === 6}>
          Click to hit the ball
        </button>

        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}