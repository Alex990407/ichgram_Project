import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3003/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data; // Предполагаем, что сервер возвращает `token`

      if (token) {
        localStorage.setItem("authToken", token);
      }

      setLoading(false);
      return response.data; // Возвращаем данные из API
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  return { login, loading, error };
};

export default useLogin;
