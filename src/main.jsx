import React from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/success" component={Success} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
