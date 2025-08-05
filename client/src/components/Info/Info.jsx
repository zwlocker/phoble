import React from "react";

const Info = ({ onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#180647]  backdrop-blur-md border-2 border-violet-400 rounded-xl p-8 mx-4 max-w-xl w-full text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-violet-200">
          Welcome to Phoble
        </h1>
        <p className="leading-relaxed">
          Phoble works by querying Spotify's public API to generate the song of
          the day. Our algorithm is designed to display songs on a popularity
          gradient, which gives users a mix of familiar favorites and songs they
          might have never heard of. As the week goes on, the songs become less
          and less mainstream until the cycle resets on Monday. Our goal is to
          encourage genuine conversation about all of these songs, and to help
          introduce users to different tastes and perspectives.
        </p>
        <br />
        <p className="leading-relaxed">
          Anyone can listen to snippets of every song directly on our website.
          The full versions of each song are only displayed to users who are
          logged into Spotify. Phoble is not directly affiliated with Spotify in
          any way.
        </p>
      </div>
    </div>
  );
};

export default Info;
