import React from 'react';
import './Photo.css';

const Photo = ({src, title, activePhoto, close}) => {
  return (
    <div className={`photo__container ${activePhoto? 'photo__active' : ''}`}>
    <img alt={title} src={src} />
    <button onClick={close}>Close</button>
    </div>
  );
}

export default Photo;