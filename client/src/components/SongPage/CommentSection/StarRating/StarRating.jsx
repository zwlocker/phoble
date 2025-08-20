import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

/*
This is the StarRating component, which processes ratings for the Comment component.
*/

const StarRating = ({ rating, setRating }) => {
  return (
    <Rating
      value={rating}
      emptyIcon={<StarIcon fontSize="inherit" />}
      precision={0.5}
      onChange={(e, newRating) => {
        setRating(newRating);
      }}
    />
  );
};

export default StarRating;
