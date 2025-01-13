import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";

const EditProfile = () => {
  const { profile, loading, error, fetchProfile, updateProfile } =
    useUserProfile();

  const [formData, setFormData] = useState({
    username: "",
    website: "",
    about: "",
  });

  // Загружаем данные профиля при загрузке компонента
  useEffect(() => {
    fetchProfile();
  }, []);

  // Обновляем локальное состояние, если профиль загружен
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        website: profile.website || "",
        about: profile.description || "",
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile({
      username: formData.username,
      website: formData.website,
      description: formData.about,
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
        paddingX: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Заголовок */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          textAlign: "center",
          fontSize: { xs: "20px", sm: "24px" },
        }}
      >
        Edit Profile
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Блок для аватара, имени и кнопки загрузки */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          p={2}
          sx={{
            backgroundColor: "rgba(239, 239, 239, 1)",
            borderRadius: "12px",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://via.placeholder.com/150"
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {formData.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {formData.about.split("\n")[0]}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "500",
              width: "115px",
              height: "32px",
              padding: "6px 0",
              borderRadius: "8px",
              backgroundColor: "rgba(0, 149, 246, 1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 120, 200, 1)",
              },
            }}
          >
            New photo
            <input hidden accept="image/*" type="file" />
          </Button>
        </Box>

        {/* Поля формы */}
        <TextField
          fullWidth
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          sx={{ marginBottom: 3 }}
        />

        <TextField
          fullWidth
          name="website"
          label="Website"
          value={formData.website}
          onChange={handleChange}
          variant="outlined"
          sx={{ marginBottom: 3 }}
        />

        <TextField
          fullWidth
          name="about"
          label="About"
          value={formData.about}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
          inputProps={{ maxLength: 150 }}
          sx={{ marginBottom: 4 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "rgba(0, 149, 246, 1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 120, 200, 1)",
            },
          }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditProfile;
