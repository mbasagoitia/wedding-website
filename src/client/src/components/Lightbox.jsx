import { useEffect } from "react";

function Lightbox({ images, lightboxIndex, setLightboxIndex, closeLightbox }) {
  const prevImage = (event) => {
    if (!event.target.classList.contains("close")) {
      setLightboxIndex((lightboxIndex + images.length - 1) % images.length);
    }
    event.stopPropagation();
  };

  const nextImage = (event) => {
    if (!event.target.classList.contains("close")) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
    event.stopPropagation();
  };

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    const handleOutsideClick = (event) => {
      if (event.target === event.currentTarget) {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [closeLightbox]);

  if (!images.length) return null;

  return (
    <div className="lightbox" onClick={(event) => event.target === event.currentTarget && closeLightbox()}>
      <span className="close" onClick={closeLightbox}>
        &times;
      </span>
      {images[lightboxIndex].toLowerCase().endsWith(".mp4") ? (
        <video controls autoPlay>
          <source src={images[lightboxIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={images[lightboxIndex]} alt={`Image ${lightboxIndex}`} />
      )}
      <a className="prev" onClick={prevImage}>
        &#8249;
      </a>
      <a className="next" onClick={nextImage}>
        &#8250;
      </a>
      <div className="progress-bar">
        {images.map((_, index) => (
          <span
            key={index}
            className={`progress-dot ${index === lightboxIndex ? "active" : ""}`}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Lightbox;
