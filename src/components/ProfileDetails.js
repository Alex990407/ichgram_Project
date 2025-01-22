import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarComponent from "./AvatarComponent";

const ProfileDetails = ({ profile }) => {
  const navigate = useNavigate();

  console.log();
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Grid item xs={12} sm={3} textAlign="center">
        <AvatarComponent size={80} avatarUrl={profile.avatarUrl} />
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
            <strong>{profile.followers}</strong> followers
          </Typography>
          <Typography>
            <strong>{profile.following}</strong> following
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {profile.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
