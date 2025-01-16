import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostModal from "../components/PostModal";

const Home = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Состояние для модального окна
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const navigate = useNavigate();

  // Функция для получения постов
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3003/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setPosts(response.data); // Убедитесь, что данные включают username, likes и comments
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      setLoading(false);
    }
  };

  // Загрузка постов при монтировании компонента
  useEffect(() => {
    fetchPosts();
  }, []);

  // Обработчик клика на пост
  const handlePostClick = (postId) => {
    setSelectedPostId(postId); // Устанавливаем ID выбранного поста
    setIsPostModalOpen(true); // Открываем модальное окно
  };

  // Обработчик перехода на отдельную страницу
  const handleNavigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Обработчик закрытия модального окна
  const handleClosePostModal = () => {
    setIsPostModalOpen(false); // Закрываем модальное окно
    setSelectedPostId(null); // Сбрасываем ID поста
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
          gridTemplateColumns: {
            xs: "1fr", // Одна колонка на маленьких экранах
            sm: "repeat(auto-fill, minmax(200px, 1fr))", // Карточки от 200px шириной
            md: "repeat(auto-fill, minmax(300px, 1fr))", // Карточки от 300px шириной
          },
          gap: "16px",
          padding: "16px",
          width: "100%",
        }}
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onClick={() => handlePostClick(post._id)} // Открываем модальное окно
            onNavigate={() => handleNavigateToPost(post._id)} // Добавляем переход
          />
        ))}
      </Container>

      {/* Модальное окно для поста */}
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
