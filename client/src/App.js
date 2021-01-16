import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import DashBoard from "./components/DashBoard/DashBoard";

import Test from "./components/Test/Test";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
