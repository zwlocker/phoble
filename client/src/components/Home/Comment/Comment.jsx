import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../api";

const Comment = ({ comment, onDelete }) => {
  const handleClick = async () => {
    const res = await deleteComment(comment._id);
    onDelete(comment._id);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#285177",
        padding: 1,
        marginBottom: 1,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography>{comment.message}</Typography>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Comment;
