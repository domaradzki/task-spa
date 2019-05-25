import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Album.css";
import { getAlbumPromise, getPhotosPromise } from "../../Services";
import Photo from "../Photo";

class Album extends Component {
  state = {
    albumName: "",
    photos: [],
    activePhoto: false,
    photoTitle: "",
    photoSrc: "",
    photoNumber: null,
    photoIds: [],
    isLoading: true
  };
  componentDidMount() {
    const { albumId } = this.props.match.params;
    Promise.all([getAlbumPromise(albumId), getPhotosPromise(albumId)]).then(
      ([album, photos]) => {
        this.setState({
          isLoading: false,
          albumName: album.title,
          photos
        });
      },
      error => {
        this.setState({
          error,
          isLoading: false
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
    const buttonUp = document.querySelector(".button__up");
    const scrollHeader = document.querySelector(".album__header--scroll");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      if (buttonUp) {
        buttonUp.style.display = "block";
      }
    } else {
      if (buttonUp) {
        buttonUp.style.display = "none";
      }
    }
    
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

  handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  render() {
    const {
      photos,
      albumName,
      activePhoto,
      photoSrc,
      photoTitle,
      isLoading
    } = this.state;
    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
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
            <h3 className="album__header--scroll">Album - {albumName}</h3>
            <Link to={`/`}>
              <button className="button__back">Back</button>
            </Link>
            <button onClick={this.handleScrollTop} className="button__up">
              Up
            </button>
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
        )}
      </>
    );
  }
}

export default Album;
