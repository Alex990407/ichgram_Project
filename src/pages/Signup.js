import React, { useState, useEffect } from "react";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";
import styles from "../styles/Signup.css";
import { validateEmail, validatePassword } from "../utils/validation";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const { register, loading, error, success, clearError } = useRegister();
  const navigate = useNavigate();

  // Перенаправление на страницу логина при успешной регистрации
  useEffect(() => {
    if (success) {
      navigate("/login"); // Переносим пользователя на страницу логина
    }
  }, [success, navigate]);

  // Обработчик изменения данных в форме
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Обновляем данные формы
    setFormData({ ...formData, [name]: value });

    // Очищаем ошибку для текущего поля
    setErrors({ ...errors, [name]: "" });

    // Если есть глобальная ошибка (например, предупреждение о регистрации), очищаем её
    if (error) {
      clearError();
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация полей формы
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const fullNameError = formData.fullName ? null : "Full Name is required.";
    const usernameError = formData.username ? null : "Username is required.";

    if (emailError || passwordError || fullNameError || usernameError) {
      setErrors({
        email: emailError,
        password: passwordError,
        fullName: fullNameError,
        username: usernameError,
      });
      return;
    }

    // Попытка регистрации
    await register(formData, () => {
      navigate("/login"); // Переносим пользователя на страницу логина
    });

    // Если ошибка, очищаем форму (на случай ошибок регистрации)
    if (error) {
      setFormData({
        email: "",
        fullName: "",
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="icon-container">
          <IchgramIcon className="IchgramIcon" />
        </div>
        {error && (
          <div
            className="server-error"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "black",
              color: "red",
              padding: "20px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 1000,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {error}
          </div>
        )}
        <h2>Sign up to see photos and videos from your friends.</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <p>
            People who use our service may have uploaded your contact
            information to Instagram. <a href="/">Learn More</a>
          </p>
          <p>
            By signing up, you agree to our <a href="/">Terms</a>,{" "}
            <a href="/">Privacy Policy</a>, and <a href="/">Cookies Policy</a>.
          </p>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign up"}
          </button>
        </form>
        <div className="login-link">
          Have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
