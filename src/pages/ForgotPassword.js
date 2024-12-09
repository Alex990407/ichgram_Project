import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { ReactComponent as LockIcon } from "../assets/Trouble_logging.svg"; // Импорт SVG как компонент

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reset link sent to: ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <div className="icon-container">
        <LockIcon className="lock-icon" /> {/* Используем SVG как компонент */}
      </div>
      <h2>Trouble logging in?</h2>
      <p>
        Enter your email, phone, or username and we'll send you a link to get
        back into your account.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset your password</button>
      </form>
      <div className="divider">
        <span></span>
        <p>OR</p>
        <span></span>
      </div>
      <a href="/signup" className="create-account-link">
        Create new account
      </a>
      <a href="/login" className="back-to-login">
        Back to login
      </a>
    </div>
  );
};

export default ForgotPassword;
