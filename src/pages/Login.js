import React, { useState } from "react";
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

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    console.log("Logging in with:", { email, password });
    // TODO: Добавить запрос к API для логина
  };

  const styles = {
    pageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      width: "100%",
      textAlign: "center",
    },
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    iconContainer: {
      marginBottom: "20px",
    },
    inputContainer: {
      marginBottom: "10px",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    orDivider: {
      margin: "20px 0",
      textAlign: "center",
      color: "#666",
      fontSize: "14px",
    },
    signup: {
      textAlign: "center",
      marginTop: "10px",
    },
    signupLink: {
      color: "#007bff",
      textDecoration: "none",
    },
    signupLinkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginContainer}>
        <div style={styles.iconContainer}>
          <IchgramIcon />
        </div>
        <form onSubmit={handleLogin}>
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Username, or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            {errors.email && (
              <span style={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            {errors.password && (
              <span style={styles.errorMessage}>{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Log in
          </button>
        </form>
        <div style={styles.orDivider}>
          <span>OR</span>
        </div>
        <a href="/forgot-password" style={styles.signupLink}>
          Forgot password?
        </a>
        <div style={styles.signup}>
          <p>
            Don't have an account?{" "}
            <a
              href="/signup"
              style={styles.signupLink}
              onMouseOver={(e) =>
                (e.target.style.textDecoration =
                  styles.signupLinkHover.textDecoration)
              }
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
