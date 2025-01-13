import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Проверяем, есть ли токен в localStorage
  const token = localStorage.getItem("authToken");

  if (token) {
    // Если токен есть, перенаправляем на главную страницу
    return <Navigate to="/" />;
  }

  // Если токена нет, отображаем дочерний компонент (публичный маршрут)
  return children;
};

export default PublicRoute;
