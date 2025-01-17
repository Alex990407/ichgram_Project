import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/PostModal";
import usePosts from "../hooks/usePosts";

const Home = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const { fetchAllPosts, loading, error } = usePosts();
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handlePostClick = (postId) => {
    console.log("Post clicked in Home with ID:", postId);
    setSelectedPostId(postId);
    setIsPostModalOpen(true);
  };

  const handleNavigateToPost = (postId) => {
    // navigate(/post/${postId});
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPostId(null);
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
        onOpenSearch={onOpenSearch}
      />

      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          mt: 4,
          display: "grid",
          justifyContent: "center", // Центрируем карточки по горизонтали
          gridTemplateColumns: {
            xs: "1fr", // Одна колонка на маленьких экранах
            sm: "repeat(auto-fill, minmax(400px, 1fr))", // Ширина карточки минимум 400px
            md: "repeat(auto-fill, minmax(500px, 1fr))", // Ширина карточки минимум 500px
          },
          gap: "24px", // Увеличиваем расстояние между карточками
          padding: "16px",
          width: "100%",
        }}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id} // Измените здесь с `_id` на `id`
            post={post}
            onClick={() => handlePostClick(post.id)} // Измените здесь с `_id` на `id`
            onNavigate={() => handleNavigateToPost(post.id)} // Измените здесь с `_id` на `id`
          />
        ))}
      </Container>

      {selectedPostId && (
        <PostModal
          open={isPostModalOpen}
          onClose={handleClosePostModal}
          postId={selectedPostId}
        />
      )}
    </div>
  );
};

export default Home;
