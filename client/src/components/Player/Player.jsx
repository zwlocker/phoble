import React from "react";

/*
 * This is the Player component, which returns an iframe of the song
 * that matches the passed id.
 */
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
