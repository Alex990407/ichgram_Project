import React, { createContext, useContext, useState, useEffect } from "react";
import useUserProfile from "../hooks/useUserProfile";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const {
    profile,
    loading,
    error,
    fetchProfile,
    fetchProfileById,
    updateProfile,
    uploadAvatar,
  } = useUserProfile();

  // Загрузка данных профиля при монтировании
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        fetchProfile,
        fetchProfileById,
        updateProfile,
        uploadAvatar,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

// Хук для использования контекста
export const useUserProfileContext = () => useContext(UserProfileContext);
