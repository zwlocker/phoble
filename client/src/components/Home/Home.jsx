import React from "react";
import { getLatestSong } from "../../actions/songs";

let song = await getLatestSong();
const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Daily Song</h1>
      <img src={song.cover} />
    </div>
  );
};

export default Home;
