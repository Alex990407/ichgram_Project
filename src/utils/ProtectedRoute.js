import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Проверяем, есть ли токен в localStorage
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Если токена нет, перенаправляем на страницу логина
    return <Navigate to="/login" />;
  }

  // Если токен есть, отображаем дочерний компонент (защищённый маршрут)
  return children;
};

export default ProtectedRoute;
