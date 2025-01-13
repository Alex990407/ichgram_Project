import React, { useState } from "react";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";
import { ReactComponent as PhoneImg } from "../assets/PhoneImg.svg";
import "../styles/Signup.css";
import { validateEmail, validatePassword } from "../utils/validation";
import useRegister from "../hooks/useRegister";

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

  console.log("Error from useRegister:", error); // Лог для отладки

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
    await register(formData);

    // Если ошибка, очищаем форму
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
      <div className="phone-img-container">
        <PhoneImg className="phone-img" />
      </div>
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
              backgroundColor: "black", // Черный фон
              color: "red", // Красный цвет текста
              padding: "20px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 1000, // Поверх всех элементов
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
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
        {success && (
          <div className="success-message">
            <span>Registration successful! You can now log in.</span>
          </div>
        )}
        <div className="login-link">
          Have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
