import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";
import { validateEmail, validatePassword } from "../utils/validation";
import styles from "../styles/Login.module.css";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login, loading, error } = useLogin();
  const navigate = useNavigate(); // Хук для навигации

  const handleLogin = async (e) => {
    e.preventDefault();

    // Валидация полей
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    const response = await login(email, password);

    if (response) {
      console.log("Successfully logged in:", response);
      navigate("/"); // Перенаправление на домашнюю страницу
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.iconContainer}>
          <IchgramIcon />
        </div>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Username, or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Log in"}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>
        <a href="/forgot-password" className={styles.signupLink}>
          Forgot password?
        </a>
        <div className={styles.signup}>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
