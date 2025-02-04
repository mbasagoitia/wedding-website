import { useState, useEffect } from "react";
import Lightbox from "./Lightbox";

const PhotoGrid = ({ directory }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [images, setImages] = useState([]);
  // Split this into helper function?
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/photos/${directory}`);
        if (response.ok) {
          const imagePaths = await response.json();
          setImages(imagePaths);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (directory) {
      fetchImages();
    }
  }, [directory]);

  const openLightbox = (index) => {
    setLightboxIsOpen(true);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  return (
    <div className="photo-grid">
      {images.map((image, index) => (
        <div key={index} className="photo-grid-item" onClick={() => openLightbox(index)}>
          <img src={image} alt={`Uploaded image ${index}`} />
        </div>
      ))}
      {lightboxIsOpen && (
        <Lightbox
          images={images}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
}

export default PhotoGrid;
