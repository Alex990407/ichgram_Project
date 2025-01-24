import React from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";
import { getFullAvatarUrl } from "../utils/urlHelpers";
import useComments from "../hooks/useComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostModal = ({ open, onClose, post }) => {
  const { comments, loading, addComment, deleteComment } = useComments(
    post?.id
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #ddd",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Post Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",
            padding: 0,
            width: "24px",
            height: "24px",
          }}
        >
          <ClosePageIcon width="24px" height="24px" />
        </IconButton>
      </Box>

      {/* Content */}
      <Box display="flex" flexDirection="row" sx={{ height: "500px" }}>
        {!post ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : (
          <>
            {/* Left Section: Post Image */}
            <Box
              flex={1}
              sx={{
                backgroundColor: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              <img
                src={getFullAvatarUrl(post.imageUrl)}
                alt="Post"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Right Section: Post Details */}
            <Box flex={1} p={2} display="flex" flexDirection="column">
              <Typography variant="h6" fontWeight="bold">
                {post.username}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                {post.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                {post.likes} Likes | {comments?.length || 0} Comments
              </Typography>

              {/* Comments Section */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto", // Добавляем скролл, если комментарии превышают доступное место
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "8px",
                }}
              >
                {loading ? (
                  <CircularProgress style={{ margin: "auto" }} />
                ) : (
                  <CommentList comments={comments} onDelete={deleteComment} />
                )}
              </Box>

              {/* Comment Form */}
              <CommentForm onSubmit={addComment} />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default PostModal;
