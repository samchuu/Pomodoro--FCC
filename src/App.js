import React, { useState } from "react";
import "./styles.css";
import Timer from "./components/Timer";
function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [breakCounter, setBreakCounter] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isBreakTimerActive, setIsBreakTimerActive] = useState(false);

  return (
    <div className="App">
      <h1>pomodoro</h1>
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        isBreakTimerActive={isBreakTimerActive}
        setIsBreakTimerActive={setIsBreakTimerActive}
        breakCounter={breakCounter}
        setBreakCounter={setBreakCounter}
        isTimerActive={isTimerActive}
        setIsTimerActive={setIsTimerActive}
      />
    </div>
  );
}

export default App;
