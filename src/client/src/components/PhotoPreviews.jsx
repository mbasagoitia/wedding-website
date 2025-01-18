import React from 'react';
import { Link } from "react-router-dom";

function PhotoPreviews({ title, link, photo1, photo2 }) {
  return (
    <Link to={link}>
    <div className="photo-previews-container">
      <div className="photo-preview photo-preview-1">
        <img src={photo1} alt="Small Preview 1" />
      </div>
      {photo2 ? (
        <div className="photo-preview photo-preview-2">
        <img src={photo2} alt="Small Preview 2" />
        </div>
      ): null}
      <div className="title">{title}</div>
    </div>
    </Link>
  );
}

export default PhotoPreviews;