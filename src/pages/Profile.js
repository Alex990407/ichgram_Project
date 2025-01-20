import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";
import usePosts from "../hooks/usePosts";

const Profile = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const { userId } = useParams();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfileById,
  } = useUserProfile();
  const {
    fetchUserPosts,
    loading: postsLoading,
    error: postsError,
  } = usePosts();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchProfileById(userId);
      fetchUserPosts(userId).then((posts) => {
        setUserPosts(posts || []);
      });
    }
  }, [userId, fetchProfileById, fetchUserPosts]);

  if (profileLoading || postsLoading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Typography>
    );
  }

  if (profileError || postsError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        {profileError || postsError}
      </Typography>
    );
  }

  if (!profile) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 5 }}>
        No profile data available.
      </Typography>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
        onOpenSearch={onOpenSearch}
      />
      <Container maxWidth="lg" sx={{ flex: 1, marginTop: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Аватар */}
          <Grid item xs={12} sm={3} textAlign="center">
            <Avatar
              src={profile.avatarUrl || "https://via.placeholder.com/150"}
              alt={profile.username || "User Avatar"}
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
              }}
            />
          </Grid>
          {/* Информация о профиле */}
          <Grid item xs={12} sm={9}>
            <Box sx={{ marginLeft: { xs: 0, sm: 4 } }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {profile.username || "No username"}
              </Typography>
              <Typography variant="body1" sx={{ color: "gray", marginTop: 1 }}>
                {profile.description || "No description provided"}
              </Typography>
              <Box
                display="flex"
                gap={2}
                mt={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography>
                  <strong>{userPosts.length}</strong> posts
                </Typography>
                <Typography>
                  <strong>{profile.followers}</strong> followers
                </Typography>
                <Typography>
                  <strong>{profile.following}</strong> following
                </Typography>
              </Box>
              {/* Кнопки Follow и Message */}
              <Box
                mt={2}
                display="flex"
                gap={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(0, 149, 246, 1)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(0, 120, 200, 1)" },
                  }}
                >
                  Follow
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    color: "black",
                    "&:hover": { borderColor: "rgba(0, 0, 0, 0.3)" },
                  }}
                >
                  Message
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Секция постов */}
        <Grid container spacing={2} mt={4}>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  component="img"
                  src={post.imageUrl}
                  alt="Post"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    ":hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography align="center" variant="h6" color="text.secondary">
              No posts available.
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
