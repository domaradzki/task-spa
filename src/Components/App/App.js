import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={Header} />
      </Router>
    );
  }
}

export default App;
