import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Author.css";
import { getUserPromise } from "../../Services";

class Author extends Component {
  state = {
    user: {},
    error:null,
    isLoading:true
  };
  componentDidMount() {
    const { userId } = this.props.match.params;
    getUserPromise(userId).then(user => {
      this.setState({
        user,
        isLoading:false,
      });
    },
    (error)=>{
      this.setState({
        error,
        isLoading:false,
      });
    }
    );
  }

  render() {
    const {user,isLoading} = this.state;
    return (
      <>
      {isLoading ? <div>...Loading</div> :
      <div className="author__container">
        <h2>{user.name} - Profile</h2>
        <Link to={`/`}>
          <button className="button__back">Back</button>
        </Link>
        <div className="author__data">
        <label>Adress</label>
        <p>{user.address.street} {user.address.suite}</p>
        <p>{user.address.zipcode} {user.address.city}</p>
        </div>
        <div className="author__data">
        <label>Contact</label>
        <p><span>email: </span>{user.email}</p>
        <p><span>phone: </span>{user.phone}</p>
        <p><span>website: </span>{user.website}</p>
        </div>
      </div>}
      </>
    );
  }
}

export default Author;
