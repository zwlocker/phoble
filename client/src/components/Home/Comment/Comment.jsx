import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const Comment = ({ children }) => {
  return (
    <Box>
      <Typography>{children}</Typography>
    </Box>
  );
};

export default Comment;
