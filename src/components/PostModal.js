import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";
import { getFullAvatarUrl } from "../utils/urlHelpers";
import axios from "axios";

const PostModal = ({ open, onClose, postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (postId && open) {
      fetchPost();
    }
  }, [postId, open]);

  const fetchPost = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:3003/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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

      <Box display="flex" flexDirection="row" sx={{ height: "400px" }}>
        {loading ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : post ? (
          <>
            {/* Левая часть: изображение поста */}
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

            {/* Правая часть: информация о посте */}
            <Box flex={1} p={2} display="flex" flexDirection="column">
              <Typography variant="h6" fontWeight="bold">
                {post.username}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                {post.title}
              </Typography>
              <Typography variant="subtitle2">
                {post.likes} Likes | {post.comments?.length || 0} Comments
              </Typography>

              {/* Комментарии */}
              <Box mt={2}>
                {post.comments?.map((comment, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {comment.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {comment.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Typography align="center">No data available</Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default PostModal;
