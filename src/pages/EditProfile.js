import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Box,
} from "@mui/material";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "ichschool",
    website: "bit.ly/3rpilbh",
    about:
      "• Гарантия помощи с трудоустройством в ведущие IT-компании\n• Выпускники зарабатывают от 45k евро\nБЕСПЛАТНАЯ",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Saved data:", formData);
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
              textTransform: "none", // Отключаем верхний регистр текста
              fontSize: "14px", // Размер шрифта
              fontWeight: "500", // Полужирный шрифт
              width: "115px", // Фиксированная ширина
              height: "32px", // Фиксированная высота
              padding: "6px 0", // Вертикальные отступы
              borderRadius: "8px", // Скругленные углы
              backgroundColor: "rgba(0, 149, 246, 1)", // Цвет кнопки
              color: "white", // Цвет текста
              display: "flex", // Flex для центрирования
              justifyContent: "center", // Центрируем содержимое по горизонтали
              alignItems: "center", // Центрируем содержимое по вертикали
              whiteSpace: "nowrap", // Запрещаем перенос текста
              overflow: "hidden", // Скрываем выходящие элементы
              "&:hover": {
                backgroundColor: "rgba(0, 120, 200, 1)", // Цвет при наведении
              },
            }}
          >
            New photo
            <input hidden accept="image/*" type="file" />
          </Button>
        </Box>

        {/* Поле Username */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Username
        </Typography>
        <TextField
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          sx={{
            marginBottom: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        {/* Поле Website */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Website
        </Typography>
        <TextField
          fullWidth
          name="website"
          value={formData.website}
          onChange={handleChange}
          variant="outlined"
          sx={{
            marginBottom: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        {/* Поле About */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          About
        </Typography>
        <TextField
          fullWidth
          name="about"
          value={formData.about}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
          helperText={`${formData.about.length} / 150`}
          inputProps={{ maxLength: 150 }}
          sx={{
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            maxWidth: "268px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 149, 246, 1)",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "none",
            marginBottom: "16px", // Отступ снизу
            display: "block",
            "&:hover": {
              backgroundColor: "rgba(0, 120, 200, 1)",
            },
            width: { xs: "100%", sm: "268px" }, // Адаптивность
          }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditProfile;
