import React, { Component } from "react";

import "./Album.css";
import { getAlbumPromise, getPhotosPromise } from "../../Services";

class Album extends Component {
  state = {
    albumName: "",
    photos: []
  };
  componentDidMount() {
    const { albumId } = this.props.match.params;
    console.log(albumId)
    Promise.all([getAlbumPromise(albumId), getPhotosPromise(albumId)]).then(
      ([album, photos]) => {
        this.setState({
          albumName: album.title,
          photos
        });
      }
    );
  }
  render() {
    const { photos, albumName } = this.state;
    return (
      <div className="album--container">
        <h2 className="album--header">{albumName}</h2>
        <ul>
          {photos.map(photo => (
            <li className="album--box" key={photo.id}>
              <img alt={photo.title} src={photo.thumbnailUrl} />
              <p className="photo--title">{photo.title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Album;
