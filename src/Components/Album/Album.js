import React, { Component } from "react";

import "./Album.css";
import { getAlbumPromise, getPhotosPromise } from "../../Services";
import Photo from "./Photo";

class Album extends Component {
  state = {
    albumName: "",
    photos: [],
    activePhoto: false,
    photoTitle: "",
    photoSrc: ""
  };
  componentDidMount() {
    const { albumId } = this.props.match.params;
    console.log(albumId);
    Promise.all([getAlbumPromise(albumId), getPhotosPromise(albumId)]).then(
      ([album, photos]) => {
        this.setState({
          albumName: album.title,
          photos
        });
      }
    );
  }

  handleShowImage = id => {
    const photo = this.state.photos.find(photo=>id===photo.id);
    const title = photo.title;
    const url = photo.url;
    this.setState({
      activePhoto: true,
      photoTitle:title,
      photoSrc: url
    });
  };

  handleCloseImage = () => {
    this.setState({
      activePhoto: false,
      photoTitle: "",
      photoSrc: ""
    });
  }

  render() {
    const { photos, albumName, activePhoto, photoSrc, photoTitle } = this.state;
    return (
      <div className="album__container">
      {activePhoto && <Photo close={()=>this.handleCloseImage()} src={photoSrc} title={photoTitle} activePhoto={activePhoto} />}
        <h2 className="album__header">{albumName}</h2>
        <ul>
          {photos.map(photo => (
            <li
              onClick={() => this.handleShowImage(photo.id)}
              className="album__box"
              key={photo.id}
            >
              <img alt={photo.title} src={photo.thumbnailUrl} />
              <p className="photo__title">{photo.title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Album;
