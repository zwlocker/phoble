import React, { useState, useEffect } from "react";
import { getSong } from "../../../../api";

/*
 * This is the Timer component. It displays an active counter in the Navbuttons component
 * which counts down until a new song is retrieved.
 */
const Timer = () => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const estNow = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" })
      );

      const estMidnight = new Date(estNow);
      estMidnight.setDate(estMidnight.getDate() + 1);
      estMidnight.setHours(0, 0, 0, 0);

      const diffMs = estMidnight - estNow;
      const timeUntilMidnight = Math.floor(diffMs / 1000);

      setCountdown(timeUntilMidnight);
    };

    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(remainingSeconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(countdown);
  return (
    <div className="mt-5 text-xl font-semibold text-left">
      <h1>New song in: </h1>
      <p className="font-bold text-5xl">
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default Timer;
