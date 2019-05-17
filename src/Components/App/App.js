import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header";
import AlbumList from "../AlbumList/AlbumList";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={AlbumList} />
      </Router>
    );
  }
}

export default App;
