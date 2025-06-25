import React from "react";

const Player = ({ id }) => {
  return (
    <div>
      <iframe
        src={`https://open.spotify.com/embed/track/${id}`}
        width="300"
        height="152"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </div>
  );
};

export default Player;
