import React, { useEffect } from "react";
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
import useUserProfile from "../hooks/useUserProfile";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const AuthorizedProfile = ({
  onOpenCreatePost,
  onOpenNotifications,
  onOpenSearch,
}) => {
  const navigate = useNavigate();

  // Используем хук useUserProfile
  const { profile, loading, error, fetchProfile } = useUserProfile();

  useEffect(() => {
    fetchProfile(); // Загружаем данные профиля при монтировании
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

  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5, color: "red" }}>
        Failed to load profile: {error}
      </Typography>
    );
  }

  // Заглушки для нового профиля
  const defaultProfile = {
    username: "New User",
    avatarUrl: "https://via.placeholder.com/150",
    description: "No description available",
    postsCount: 0,
    followers: 0,
    following: 0,
    posts: [],
  };

  const userProfile = profile || defaultProfile;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
        onOpenSearch={onOpenSearch}
      />
      <Container sx={{ flex: 1, marginTop: 4 }}>
        {/* User Profile Section */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={3} textAlign="center">
            <Avatar
              src={getFullAvatarUrl(userProfile.avatarUrl)}
              alt={userProfile.username}
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userProfile.username}
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
                <strong>{userProfile.postsCount}</strong> posts
              </Typography>
              <Typography>
                <strong>{userProfile.followers}</strong> followers
              </Typography>
              <Typography>
                <strong>{userProfile.following}</strong> following
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {userProfile.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Posts Section */}
        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
          {userProfile.posts?.map((post) => (
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
