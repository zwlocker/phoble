import React from "react";

const Player = ({ id }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${id}`}
      width="100%"
      height="152"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
};

export default Player;
