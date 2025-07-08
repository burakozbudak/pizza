import { useState } from "react";
import reactLogo from "./assets/react.svg";
import c2wIcon from "/c2w_icon.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://github.com/Code2Work/pizza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={c2wIcon} className="logo" alt="Code2Work logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Code2Work + 🍕</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Pizza sayısı {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Code2Work logo to learn more</p>
    </>
  );
}

export default App;
