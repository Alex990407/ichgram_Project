import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";
import AvatarSection from "../components/AvatarSection";
import ProfileForm from "../components/ProfileForm";
import LoadingError from "../components/LoadingError";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const EditProfile = () => {
  const { profile, loading, error, fetchProfile, updateProfile, uploadAvatar } =
    useUserProfile();

  const [formData, setFormData] = useState({
    username: "",
    website: "",
    about: "",
  });
  const [avatarFile, setAvatarFile] = useState(null); // Для хранения файла
  const [avatarPreview, setAvatarPreview] = useState(""); // Для отображения предварительного аватара

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        website: profile.website || "",
        about: profile.description || "",
      });
      setAvatarPreview(profile.avatarUrl || ""); // Устанавливаем текущий аватар
    }
  }, [profile]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file); // Сохраняем файл для отправки позже
      setAvatarPreview(URL.createObjectURL(file)); // Устанавливаем превью
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Обновляем профиль
      const updatedProfile = await updateProfile({
        username: formData.username,
        website: formData.website,
        description: formData.about,
      });

      // Загружаем аватар, если он был выбран
      if (avatarFile) {
        const avatarData = await uploadAvatar(avatarFile);

        // Проверяем, содержит ли ответ avatarUrl
        if (avatarData && avatarData.avatarUrl) {
          setAvatarPreview(avatarData.avatarUrl); // Устанавливаем новый URL аватара
        } else {
          console.error("Server response does not contain avatarUrl.");
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

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

      <LoadingError loading={loading} error={error} />

      {!loading && !error && (
        <>
          <AvatarSection
            avatarPreview={avatarPreview}
            avatarUrl={profile?.avatarUrl}
            username={formData.username}
            about={formData.about}
            onAvatarChange={handleAvatarChange}
          />
          <ProfileForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Container>
  );
};

export default EditProfile;
