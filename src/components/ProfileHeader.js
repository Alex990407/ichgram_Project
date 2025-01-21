import React from "react";
import { Grid, Avatar, Typography, Box, Button } from "@mui/material";

const ProfileHeader = ({ profile, isCurrentUser, postCount }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
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
      <Grid item xs={12} sm={9}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {profile.username || "No username"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {profile.description || "No description provided"}
          </Typography>
          <Box display="flex" gap={3} mt={2}>
            <Typography>
              <strong>{postCount}</strong> posts
            </Typography>
            <Typography>
              <strong>{profile.followers || 0}</strong> followers
            </Typography>
            <Typography>
              <strong>{profile.following || 0}</strong> following
            </Typography>
          </Box>
          {isCurrentUser ? (
            <Button
              variant="outlined"
              onClick={() => console.log("Edit Profile clicked")}
              sx={{
                mt: 2,
                width: { xs: "100px", sm: "168px" },
                height: "32px",
                borderRadius: "8px",
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Box display="flex" gap={2} mt={2}>
              <Button variant="contained" color="primary">
                Follow
              </Button>
              <Button variant="outlined">Message</Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
