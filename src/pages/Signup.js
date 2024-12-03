import React from "react";
import logo from "../assets/ICHGRAM.png"; // Импорт логотипа ICHGRAM
import "../styles/Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      {/* ЛОГОТИП ICHGRAM */}
      <img src={logo} alt="ICHGRAM Logo" className="logo" />
      <h2>Sign up to see photos and videos from your friends.</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <p>
          People who use our service may have uploaded your contact information
          to Instagram. <a href="/">Learn More</a>
        </p>
        <p>
          By signing up, you agree to our <a href="/">Terms</a>,{" "}
          <a href="/">Privacy Policy</a>, and <a href="/">Cookies Policy</a>.
        </p>
        <button type="submit">Sign up</button>
      </form>
      <div className="login-link">
        Have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}

export default Signup;
