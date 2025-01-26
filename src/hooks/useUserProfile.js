import { useState, useCallback } from "react";
import axios from "axios";

const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = "http://localhost:3003/api/profiles";

  // Получить данные текущего авторизованного пользователя
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiBase, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  // Получить данные профиля по userId
  const fetchProfileById = useCallback(async (userId) => {
    console.log("fetchProfileById", userId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBase}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile by ID");
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновить данные текущего профиля
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
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    fetchProfileById,
    updateProfile,
    uploadAvatar,
  };
};

export default useUserProfile;
