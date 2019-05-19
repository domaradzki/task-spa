import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./AlbumList.css";
import { getAlbumsPromise, getUsersPromise } from "../../Services";

class AlbumList extends Component {
  state = {
    albums: [],
    error:null,
    isLoading: true
  };
  componentDidMount() {
    Promise.all([getAlbumsPromise(), getUsersPromise()]).then(
      ([albums, users]) => {
        albums.map(
          album => (album.author = users.find(user => album.userId === user.id))
        );
        this.setState({
          albums,
          isLoading:false
        });
      },
      (error)=>{
        this.setState({
          error,
          isLoading:false
        });
      }
    );
  }
  render() {
    const { albums, isLoading } = this.state;
    return (
      <>
      {isLoading ? <div>...Loading</div> : 
      (<div className="albumlist__container">
        <h2 className="albumlist__header">Albums</h2>
        <ul>
          {albums.map(album => 
            <li className="album__box" key={album.id}>
            <h4 className="album__title"><Link to={`/album/${album.id}`}>{album.title}</Link></h4>
            <p className="album__author"><Link to={`/user/${album.userId}`}>{album.author.name}</Link></p>
            </li>
          )}
        </ul>
      </div>)}
      </>
    );
  }
}

export default AlbumList;
