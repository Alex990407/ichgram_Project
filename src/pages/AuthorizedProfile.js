import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../components/CreatePostModal";
// import axios from "axios";

const AuthorizedProfile = ({ onOpenCreatePost, onOpenNotifications }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Закомментированный запрос на сервер
    /*
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setProfile(response.data.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
    */

    // Используем мок-данные
    const mockProfile = {
      username: "itcareerhub",
      avatarUrl: "https://via.placeholder.com/150",
      description:
        "Гарантия помощи с трудоустройством в ведущие IT-компании\nВыпускники зарабатывают от 45k евро\nБЕСПЛАТНА ...",
      postsCount: 129,
      followers: 9993,
      following: 59,
      posts: [
        {
          id: 1,
          imageUrl: "https://via.placeholder.com/300",
          title: "Проект с участием выпускников IT Career Hub",
        },
        {
          id: 2,
          imageUrl: "https://via.placeholder.com/300",
          title: "Получите инструкцию к поиску работы в Германии",
        },
      ],
    };

    setProfile(mockProfile);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Container sx={{ flex: 1, marginTop: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Skeleton variant="circular" width={120} height={120} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={300} height={20} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No profile data available.
      </Typography>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Передаём функцию открытия модалки */}
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
      />
      <Container sx={{ flex: 1, marginTop: 4 }}>
        {/* User Profile Section */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={3} textAlign="center">
            <Avatar
              src={profile.avatarUrl || "https://via.placeholder.com/150"}
              alt={profile.username}
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {profile.username}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/edit-profile")}
                sx={{
                  width: { xs: "100px", sm: "168px" },
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(239, 239, 239, 1)",
                  color: "rgba(0, 0, 0, 1)",
                  fontFamily: "Roboto",
                  textAlign: "center",
                  fontSize: "14px",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>
            <Box display="flex" gap={3} mb={2}>
              <Typography>
                <strong>{profile.postsCount || 0}</strong> posts
              </Typography>
              <Typography>
                <strong>{profile.followers || 0}</strong> followers
              </Typography>
              <Typography>
                <strong>{profile.following || 0}</strong> following
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {profile.description || "No description available"}
            </Typography>
          </Grid>
        </Grid>

        {/* Posts Section */}
        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
          {profile.posts?.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ flexGrow: 1 }}>
              <Box
                component="img"
                src={post.imageUrl}
                alt={post.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  objectFit: "cover",
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AuthorizedProfile;
