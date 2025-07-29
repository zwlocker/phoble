import React, { useState, useEffect } from "react";
import { getSong } from "../../../../api";
import { refreshSong } from "../../../../api";

const Timer = () => {
  const [song, setSong] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const songId = "latest";
        const data = await getSong(songId);

        setSong(data);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };
    fetchSong();
  }, []);

  useEffect(() => {
    if (!song?.createdAt) return;

    const updateCountdown = () => {
      const now = new Date();
      let latestSongDate = new Date(song.createdAt);
      const timeSinceLastSong = now - latestSongDate;

      let timeUntilNext = 86400000 - (timeSinceLastSong % 86400000);
      setCountdown(Math.floor(timeUntilNext / 1000)); //converts to seconds
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    if (countdown == 0) {
      const refresh = async () => {
        await refreshSong();
      };
      refresh();
    }
    const cleanup = () => clearInterval(interval);
    return cleanup;
  }, [song]);

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
    <div className="mt-5 text-xl  text-center">
      <h1>Time until next song: </h1>
      <p className="font-bold text-5xl">
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default Timer;
