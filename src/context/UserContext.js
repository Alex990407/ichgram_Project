import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = "http://localhost:3003/api/profiles";

  // Получение данных профиля авторизованного пользователя
  const fetchProfile = async () => {
    console.log("fetchProfileById");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiBase, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setAvatarUrl(getFullAvatarUrl(response.data.avatarUrl));
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Получение данных профиля по ID пользователя
  const fetchProfileById = async (userId) => {
    console.log("fetchProfileById");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBase}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data);
      setAvatarUrl(getFullAvatarUrl(response.data.avatarUrl));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile by ID");
    } finally {
      setLoading(false);
    }
  };

  // Обновление профиля
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(apiBase, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Загрузка нового аватара
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiBase}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatarUrl(getFullAvatarUrl(response.data.avatarUrl));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        avatarUrl,
        loading,
        error,
        fetchProfile,
        fetchProfileById,
        updateProfile,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
export const useUserContext = () => useContext(UserContext);
