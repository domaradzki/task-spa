import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./Album.css";
import { getAlbumPromise, getPhotosPromise } from "../../Services";
import Photo from "./Photo";

class Album extends Component {
  state = {
    albumName: "",
    photos: [],
    activePhoto: false,
    photoTitle: "",
    photoSrc: "",
    photoNumber: null,
    photoIds: []
  };
  componentDidMount() {
    const { albumId } = this.props.match.params;
    Promise.all([getAlbumPromise(albumId), getPhotosPromise(albumId)]).then(
      ([album, photos]) => {
        this.setState({
          albumName: album.title,
          photos
        });
      }
    );
    window.onscroll = () => this.showUpButton();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  handleShowImage = id => {
    const photo = this.state.photos.find(photo => id === photo.id);
    const photoTitle = photo.title;
    const photoSrc = photo.url;
    const photoNumber = id;
    const photoIds = this.state.photos.map(photo => photo.id);
    this.setState({
      activePhoto: true,
      photoTitle,
      photoSrc,
      photoNumber,
      photoIds
    });
  };

  handleCloseImage = () => {
    this.setState({
      activePhoto: false,
      photoTitle: "",
      photoSrc: "",
      photoNumber: null
    });
  };

  handleLeftImage = () => {
    this.changePhotoNumber(-1);
  };

  handleRightImage = () => {
    this.changePhotoNumber(1);
  };

  changePhotoNumber = change => {
    const photoNumber = this.state.photoIds.includes(
      this.state.photoNumber + change
    )
      ? this.state.photoNumber + change
      : this.state.photoNumber;
    const photo = this.state.photos.find(photo => photoNumber === photo.id);
    const photoTitle = photo.title;
    const photoSrc = photo.url;
    this.setState({
      photoTitle,
      photoSrc,
      photoNumber
    });
  };

  showUpButton = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ) {
      document.querySelector(".button__up").style.display = "block";
    } else {
      document.querySelector(".button__up").style.display = "none";
    }
  }

  handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  render() {
    
    const { photos, albumName, activePhoto, photoSrc, photoTitle } = this.state;
    return (
      <div className="album__container">
        {activePhoto && (
          <Photo
            left={() => this.handleLeftImage()}
            right={() => this.handleRightImage()}
            close={() => this.handleCloseImage()}
            src={photoSrc}
            title={photoTitle}
            activePhoto={activePhoto}
          />
        )}
        <h2>{albumName}</h2>
        <Link to={`/`}><button className="button__back">Back</button></Link>
        <button onClick={this.handleScrollTop} className="button__up">Up</button>
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
