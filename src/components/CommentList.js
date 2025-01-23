import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentList = ({ comments, onDelete }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.map((comment) => (
        <Box
          key={comment._id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "8px 0",
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {comment.userId?.username || "Unknown"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              {comment.commentText}
            </Typography>
          </Box>
          {onDelete && (
            <IconButton
              onClick={() => onDelete(comment._id)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
