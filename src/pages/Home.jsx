import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-container">
      {/* Logo */}
      <img
        src="/images/iteration-1-images/logo.svg"
        alt="Teknolojik Yemekler Logo"
        className="logo"
      />

      {/* Banner Image */}
      <div className="banner">
        <img
          src="/images/iteration-1-images/home-banner.png"
          alt="Lezzetli pizzalar"
          className="banner-image"
        />
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 className="title">Teknolojik Yemekler</h1>
        <p className="subtitle">fırsatı kaçırma, pizzanı hemen seç!</p>

        <button className="order-button" onClick={() => history.push("/order")}>
          SİPARİŞ VER
        </button>
      </div>

      {/* Footer (optional) */}
      <div className="footer">
        <img
          src="/images/logo-footer.svg"
          alt="Footer Logo"
          className="footer-logo"
        />
      </div>
    </div>
  );
};

export default Home;

// This code defines a simple React component for the home page of a food ordering application.
// It includes a header with the title "Teknolojik Yemekler" and a main section with a hero message and a button to navigate to the order page.
// The useHistory hook from react-router-dom is used to programmatically navigate to the order page when the button is clicked.
