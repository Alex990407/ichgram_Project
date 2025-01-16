import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки аватара с сервера
  const fetchAvatar = async () => {
    const token = localStorage.getItem("authToken");
    console.log("Using token:", token);
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3003/api/profiles/avatar",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setAvatarUrl(response.data.avatarUrl); // Предполагается, что сервер возвращает avatarUrl
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load avatar");
    } finally {
      setLoading(false);
    }
  };

  // Функция для обновления аватара
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3003/api/profiles/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatarUrl(response.data.avatarUrl); // Обновляем URL аватара
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatar(); // Загружаем аватар при первом рендере
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarUrl, loading, error, uploadAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

// Хук для использования контекста
export const useAvatar = () => useContext(AvatarContext);
