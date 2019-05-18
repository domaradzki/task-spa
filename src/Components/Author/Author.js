import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Author.css";
import { getUserPromise } from "../../Services";

class Author extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    const { userId } = this.props.match.params;
    getUserPromise(userId).then(user => {
      this.setState({
        user
      });
    });
  }

  render() {
    console.log(this.state.user);
    const { authorId } = this.state;
    return (
      <div className="album__container">
        <h2>{authorId}</h2>
        <Link to={`/`}>
          <button className="button__back">Back</button>
        </Link>
        <button onClick={this.handleScrollTop} className="button__up">
          Up
        </button>
        <ul />
      </div>
    );
  }
}

export default Author;
