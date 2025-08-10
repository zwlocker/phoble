import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

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
