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
} from "@mui/material";

const Profile = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Закомментированный код для запроса на сервер
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/profile/${userId}`);
  //       setProfile(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, [userId]);

  useEffect(() => {
    // Мок-данные для тестирования
    const mockProfiles = {
      user1: {
        username: "Adolf Hitler",
        fullname: "Adolf Hitler",
        avatarUrl: "https://via.placeholder.com/150",
        description: "Ein Volk, ein reich, ein Führer !",
        followers: 9993,
        following: 59,
        posts: [
          { id: 1, imageUrl: "https://via.placeholder.com/150" },
          { id: 2, imageUrl: "https://via.placeholder.com/150" },
          { id: 3, imageUrl: "https://via.placeholder.com/150" },
        ],
      },
      user2: {
        username: "John Doe",
        fullname: "John Doe",
        avatarUrl: "https://via.placeholder.com/150",
        description: "Lorem ipsum dolor sit amet.",
        followers: 1234,
        following: 56,
        posts: [
          { id: 4, imageUrl: "https://via.placeholder.com/150" },
          { id: 5, imageUrl: "https://via.placeholder.com/150" },
        ],
      },
    };

    const userProfile = mockProfiles[userId];
    if (userProfile) {
      setProfile(userProfile);
    } else {
      setProfile(null);
    }
    setLoading(false);
  }, [userId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!profile) return <Typography>No profile data available.</Typography>;

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
              src={profile.avatarUrl}
              alt={profile.fullname}
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
              }}
            />
          </Grid>
          {/* Информация о профиле */}
          <Grid item xs={12} sm={9}>
            {/* Добавлен отступ для текста */}
            <Box sx={{ marginLeft: { xs: 0, sm: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {profile.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "gray",
                  marginTop: 1,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {profile.description}
              </Typography>
              <Box
                display="flex"
                gap={2}
                mt={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography>
                  <strong>{profile.posts.length}</strong> posts
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
          {profile.posts.map((post) => (
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
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
