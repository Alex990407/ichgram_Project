import { useState, useEffect } from "react";
import axios from "axios";

const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = "http://localhost:3003/api/profiles";

  // Получить данные профиля
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiBase, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data); // Устанавливаем данные профиля
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Обновить данные профиля
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(apiBase, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data); // Обновляем данные профиля в состоянии
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Загрузить аватар
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
      setProfile(response.data); // Обновляем профиль с новым аватаром
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  // Создать профиль (если потребуется)
  const createProfile = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(apiBase, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data); // Устанавливаем созданный профиль
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  // Удалить профиль (если потребуется)
  const deleteProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(apiBase, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(null); // Убираем профиль из состояния
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadAvatar, // Добавляем функцию загрузки аватара
    createProfile,
    deleteProfile,
  };
};

export default useUserProfile;
