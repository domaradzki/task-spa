import React from 'react';
import './Photo.css';

const Photo = ({src, title, close, left, right}) => {
  return (
    <div className="photo__container">
    <img alt={title} src={src} />
    <button onClick={close}>Close</button>
    <button className="button__left" onClick={left}>&#60;</button>
    <button className="button__right" onClick={right}>&#62;</button>
    </div>
  );
}

export default Photo;