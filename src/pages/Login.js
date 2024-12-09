import React, { useState } from "react";
import "../styles/Login.css";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg"; // Импорт SVG как компонент
// import logo from "../assets/ICHGRAM.png"; // Импорт логотипа ICHGRAM

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // TODO: Добавить запрос к API для логина
  };

  return (
    <div className="login-container">
      {/* ЛОГОТИП ICHGRAM */}
      {/* <img src={logo} alt="ICHGRAM Logo" className="logo" /> */}
      <div className="icon-container">
        <IchgramIcon className="IchgramIcon" />{" "}
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Username, or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
