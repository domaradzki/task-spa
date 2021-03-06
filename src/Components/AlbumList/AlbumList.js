import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./AlbumList.css";
import { getAlbumsPromise, getUsersPromise } from "../../Services";

class AlbumList extends Component {
  state = {
    albums: [],
    error: null,
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
          isLoading: false
        });
      },
      error => {
        this.setState({
          error,
          isLoading: false
        });
      }
    );
    window.onscroll = () => this.showHeader();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }
  showHeader = () => {
    const scrollHeader = document.querySelector(".albumlist__header--scroll");
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      if (scrollHeader) {
        scrollHeader.style.display = "block";
      }
    } else {
      if (scrollHeader) {
        scrollHeader.style.display = "none";
      }
    }
  };

  render() {
    const { albums, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="albumlist__container">
            <h2 className="albumlist__header">Albums</h2>
            <h3 className="albumlist__header--scroll">Album name and author</h3>
            <ul>
              {albums.map(album => (
                <li className="albumlist__box" key={album.id}>
                  <h4 className="album__title">
                    <Link to={`/album/${album.id}`}>{album.title}</Link>
                  </h4>
                  <p className="album__author">
                    <Link to={`/user/${album.userId}`}>
                      {album.author.name}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default AlbumList;
