import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./AlbumList.css";
import { getAlbumsPromise, getUsersPromise } from "../../Services";

class AlbumList extends Component {
  state = {
    albums: [],
    isLoading: false
  };
  componentDidMount() {
    Promise.all([getAlbumsPromise(), getUsersPromise()]).then(
      ([albums, users]) => {
        albums.map(
          album => (album.author = users.find(user => album.userId === user.id))
        );
        this.setState({
          albums
        });
      }
    );
  }
  render() {
    const { albums } = this.state;
    return (
      <div className="albumlist--container">
        <h2 className="albumlist--header">Albums</h2>
        <ul>
          {albums.map(album => 
            <li className="album--box" key={album.id}>
            <h4 className="album--title"><Link to={`/${album.id}`}>{album.title}</Link></h4>
            <p className="album--author">{album.author.name}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default AlbumList;
