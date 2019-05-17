import React, { Component } from "react";
import "./AlbumList.css";
import { getAlbumsPromise, getUsersPromise } from "../../Services";

class AlbumList extends Component {
  state ={
    albums : [],
    isLoading:false
  }
  componentDidMount() {
    Promise.all([getAlbumsPromise(), getUsersPromise()])
    .then(([albums, users]) => {
      albums.map(album => album.author = users.find(user=>album.userId===user.id));
      this.setState({
        albums
      })
    })
  }

  render() {
    console.log(this.state.albums)
    return (
      <div className="ablumlist--container">
        <h2 className="ablumlist--header">Albums</h2>
        <ul>{}</ul>
      </div>
    );
  }
}

export default AlbumList;
