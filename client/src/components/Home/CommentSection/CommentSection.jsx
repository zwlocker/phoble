import Box from "@mui/material/Box";
import React from "react";
import Comment from "../Comment/Comment";

const CommentSection = ({ comments }) => {
  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment._id}>{comment.message}</Comment>
      ))}
    </Box>
  );
};

export default CommentSection;
