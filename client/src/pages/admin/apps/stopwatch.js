import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useState, useEffect } from "react";

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h2>Stopwatch</h2>
        <section>
          <div className="stopwatch">
            <h2>{formatTime(time)}</h2>
          <div>
             <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
