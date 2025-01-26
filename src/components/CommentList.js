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
              sx={{
                padding: 0,
                width: "24px",
                height: "24px",
                "&:hover": {
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
