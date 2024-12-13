import React, { useState } from "react";
import "../styles/Login.css";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg"; // Импорт SVG как компонент
import { validateEmail, validatePassword } from "../utils/validation"; // Импорт функций валидации

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    // Валидация полей
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    console.log(emailError);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    console.log("Logging in with:", { email, password });
    // TODO: Добавить запрос к API для логина
  };

  return (
    <div className="login-container">
      <div className="icon-container">
        <IchgramIcon className="IchgramIcon" />{" "}
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Username, or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <button type="submit">Log in</button>
      </form>
      <div className="or-divider">
        <span>OR</span>
      </div>
      <a href="/forgot-password">Forgot password?</a>
      <div className="signup">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
