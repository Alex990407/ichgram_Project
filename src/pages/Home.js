import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";
import usePosts from "../hooks/usePosts";

const Home = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const { fetchAllPosts, likePost, loading, error } = usePosts();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Загрузка постов при монтировании компонента
  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchAllPosts();
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };
    loadPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      if (updatedPost) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  if (loading)
    return <CircularProgress style={{ margin: "auto", display: "block" }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "16px",
        gap: "24px",
        backgroundColor: "#f8f9fa",
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onClick={() => handlePostClick(post)}
          onLike={handleLikePost} // Передаём обработчик лайков
        />
      ))}
      {selectedPost && (
        
        <PostModal
          open={isPostModalOpen}
          onClose={handleClosePostModal}
          post={selectedPost}
        />
      )}
    </Box>
  );
};

export default Home;
