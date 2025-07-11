import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";
import "./App.css";

function App() {
  return (
    <div className="app-container" data-testid="app-root">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/success" component={Success} />
      </Switch>
    </div>
  );
}

export default App;
