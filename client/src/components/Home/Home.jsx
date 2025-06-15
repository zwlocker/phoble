import React from "react";
import { getLatestSong } from "../../actions/songs";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLatestSong());
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Hello Landon</h1>
      <p className="mt-4">Hi</p>
    </div>
  );
};

export default Home;
