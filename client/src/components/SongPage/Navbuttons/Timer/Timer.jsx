import React, { useState, useEffect } from "react";
import { getSong } from "../../../../api";

const Timer = () => {
  const [song, setSong] = useState(null);

  const date = new Date();
  let latestSongDate;
  let countdown;

  //we have time in milliseconds since latest song was added
  //take away from milliseconds in a day
  //
  //mod by milli, seconds, minutes, hours
  //86400000 milliseconds in a day

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
    latestSongDate = new Date(song.createdAt);
    setInterval(() => {
      countdown = date - latestSongDate;
    }, 1000);
  }, []);

  const countdownInSecs = countdown % 86400000;

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

  const { hours, minutes, seconds } = formatTime(countdownInSecs);
  return (
    <div>
      <h1>Time until next song: </h1>
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default Timer;
