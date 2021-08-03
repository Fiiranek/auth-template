import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./parts/Navbar/Navbar";
import React, { useEffect } from "react";
import { SERVER_URL } from "./config/config";
function App() {
  useEffect(() => {
    //fetch(`${SERVER_URL}/`);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/register" component={(props) => <Register />} />
          <Route path="/login" component={(props) => <Login />} />
          <Route path="/" component={(props) => <Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
