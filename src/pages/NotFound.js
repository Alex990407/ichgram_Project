import React from "react";
import "../styles/NotFound.css";
import { ReactComponent as PhoneImg } from "../assets/PhoneImg.svg";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="icon-container">
          <PhoneImg className="Phone-img" />{" "}
          {/* Используем SVG как компонент */}
        </div>
        <div className="text-container">
          <h1>Oops! Page Not Found (404 Error)</h1>
          <p>
            We're sorry, but the page you're looking for doesn't seem to exist.
            <br />
            If you typed the URL manually, please double-check the spelling.
            <br />
            If you clicked on a link, it may be outdated or broken.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
