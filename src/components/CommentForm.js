import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mt: 2 }}
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <Button type="submit" variant="contained" color="primary">
        Post
      </Button>
    </Box>
  );
};

export default CommentForm;
