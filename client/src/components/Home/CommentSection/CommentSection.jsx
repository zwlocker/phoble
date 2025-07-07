import Box from "@mui/material/Box";
import React from "react";
import Comment from "../Comment/Comment";

const CommentSection = ({ comments, onDeleteComment }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#132d52",
        padding: 2,
        borderRadius: 4,
        border: "2px solid rgb(50, 154, 157)",
      }}
    >
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onDelete={onDeleteComment}
        />
      ))}
    </Box>
  );
};

export default CommentSection;
