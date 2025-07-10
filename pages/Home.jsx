import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import " ./Home.css";

const Home = () => {
  const history = useHistory();
  return (
    <div className="home-container">
      <header>
        <h1>Teknolojik Yemekler</h1>
      </header>
      <main>
        <div className="hero">
          <h2>Acıktın mı?</h2>
          <button onClick={() => history.push("/order")}>Sipariş Ver</button>
        </div>
      </main>
    </div>
  );
};
export default Home;

// This code defines a simple React component for the home page of a food ordering application.
// It includes a header with the title "Teknolojik Yemekler" and a main section with a hero message and a button to navigate to the order page.
// The useHistory hook from react-router-dom is used to programmatically navigate to the order page when the button is clicked.
