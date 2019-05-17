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

  handleShowImage = id =>{
    console.log(id)
  }

  render() {
    const { photos, albumName } = this.state;
    return (
      <div className="album__container">
        <h2 className="album__header">{albumName}</h2>
        <ul>
          {photos.map(photo => (
            <li onClick={()=>this.handleShowImage(photo.id)} className="album__box" key={photo.id}>
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
