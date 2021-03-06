import React, { useEffect, useRef } from "react";
import play from "../icons/play.png";
import pause from "../icons/pause.png";
import reset from "../icons/reset.png";
function Timer({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  breakCounter,
  setBreakCounter,
  isTimerActive,
  setIsTimerActive,
  isBreakTimerActive,
  setIsBreakTimerActive,
}) {
  //variables
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const audioRef = useRef();

  //handlers
  const incrementHandler = () => {
    if (minutes < 60) {
      setMinutes((prev) => prev + 1);
    }
  };

  const decrementHandler = () => {
    if (minutes > 1) {
      setMinutes((prev) => prev - 1);
    }
  };

  const incrementBreakHandler = () => {
    if (breakCounter < 60) {
      setBreakCounter((prev) => prev + 1);
    }
  };

  const decrementBreakHandler = () => {
    if (breakCounter > 1) {
      setBreakCounter((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isTimerActive) {
      let interval = setInterval(function () {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else if (minutes === 0) {
            setIsBreakTimerActive(!isBreakTimerActive);
            setMinutes(breakCounter);

            //show first the break-length value for 800ms then play audio
            setTimeout(function () {
              audioRef.current.play();
              audioRef.current.currentTime = 8;
              setMinutes(breakCounter - 1);
              setSeconds(59);
            }, 800);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      // always remember to use clearInterval!
      return () => clearInterval(interval);
    }
  });

  const toggleTimerHandler = () => {
    setIsTimerActive(!isTimerActive);
    setSeconds(seconds);
    //if break is active and timer is running, pause the timer and audio
    if (isBreakTimerActive === true && isTimerActive === true) {
      audioRef.current.pause();
      //if break is still active and timer is not running, resume the timer and play audio
    } else if (isBreakTimerActive === true && isTimerActive === false) {
      audioRef.current.play();
    }
  };

  const resetHandler = () => {
    setIsTimerActive(false);
    setIsBreakTimerActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (isBreakTimerActive) {
      setTimeout(function () {
        setMinutes(25);
        setBreakCounter(5);
        setSeconds(0);
      }, 1000);
    } else {
      setMinutes(25);
      setBreakCounter(5);
      setSeconds(0);
    }
  };

  return (
    <div className="container">
      <div className="break">
        <h3 id="break-label">Break Length</h3>
        <div className="break-buttons">
          <div
            onClick={decrementBreakHandler}
            className="break-icons"
            id="break-decrement"
          >
            ???
          </div>
          <div className="break-icons" id="break-length">
            {breakCounter}
          </div>
          <div
            onClick={incrementBreakHandler}
            className="break-icons"
            id="break-increment"
          >
            ???
          </div>
        </div>
      </div>
      <div className="session">
        <h3 id="session-label">Session Length</h3>
        <div className="session-buttons">
          <div
            className="session-icons"
            id="session-decrement"
            onClick={decrementHandler}
          >
            ???
          </div>
          <div className="session-icons" id="session-length">
            {minutes}
          </div>
          <div
            className="session-icons"
            id="session-increment"
            onClick={incrementHandler}
          >
            ???
          </div>
        </div>
      </div>

      <div></div>
      <div className="timer">
        <h2 id="timer-label" className="display-message">
          {isBreakTimerActive ? "Break" : "Session"}
        </h2>
        <div id="time-left">
          {timerMinutes}:{timerSeconds}
        </div>
      </div>
      <div className="icons">
        <span onClick={toggleTimerHandler} id="start_stop">
          <img className="icon" src={play} alt="" />
          <img className="icon" src={pause} alt="" />
        </span>
        <span onClick={resetHandler}>
          <img className="icon" id="reset" src={reset} alt="" />
        </span>
      </div>

      <audio
        ref={audioRef}
        src="https://mp3.chillhop.com/serve.php/?mp3=17941"
        id="beep"
      ></audio>
    </div>
  );
}

export default Timer;
