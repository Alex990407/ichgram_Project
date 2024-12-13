import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Mock API Call
    const mockProfile = {
      username: "Adolf Gitler",
      fullname: "Adolf Gitler",
      avatarUrl: "https://via.placeholder.com/150",
      description: "Ein Volk, ein reich, ein Führer !",
      followers: 9993,
      following: 59,
      posts: [
        { id: 1, imageUrl: "https://via.placeholder.com/150" },
        { id: 2, imageUrl: "https://via.placeholder.com/150" },
        { id: 3, imageUrl: "https://via.placeholder.com/150" },
      ],
    };
    setProfile(mockProfile);
    setLoading(false);
  }, []);

  //   useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         const { data } = await axios.get(`/api/profile/${userId}`);
  //         setProfile(data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching profile:", error);
  //         setLoading(false);
  //       }
  //     };
  //     fetchProfile();
  //   }, [userId]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Header Section */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={3} textAlign="center">
          <Avatar
            src={profile.avatarUrl}
            alt={profile.fullname}
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h4">{profile.username}</Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            {profile.description}
          </Typography>
          <Box display="flex" gap={2} mt={2}>
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
          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "capitalize",
                padding: "5px 15px",
                fontSize: "14px",
              }}
            >
              Follow
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                textTransform: "capitalize",
                padding: "5px 15px",
                fontSize: "14px",
                ":hover": {
                  color: "#fff", // Белый текст при наведении
                  backgroundColor: "#3b5998", // Синий фон при наведении
                },
              }}
            >
              Message
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Posts Section */}
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
                  transform: "scale(1.05)", // Эффект увеличения при наведении
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;

//   useEffect(() => {
//     // Mock API Call
//     const mockProfile = {
//       username: "Adolf Gitler",
//       fullname: "Adolf Gitler",
//       avatarUrl: "https://via.placeholder.com/150",
//       description: "Ein Volk, ein reich, ein Führer !",
//       followers: 9993,
//       following: 59,
//       posts: [
//         { id: 1, imageUrl: "https://via.placeholder.com/150" },
//         { id: 2, imageUrl: "https://via.placeholder.com/150" },
//         { id: 3, imageUrl: "https://via.placeholder.com/150" },
//       ],
//     };
//     setProfile(mockProfile);
//     setLoading(false);
//   }, []);
