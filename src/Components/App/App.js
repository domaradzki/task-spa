import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header";
import AlbumList from "../AlbumList";
import Album from "../Album";
import Author from "../Author";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app__container">
        <Header />
        <Route exact path="/" component={AlbumList} />
        <Route path="/album/:albumId" component={Album} />
        <Route path="/user/:userId" component={Author} />
        </div>
      </Router>
    );
  }
}

export default App;
