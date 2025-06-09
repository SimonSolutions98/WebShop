import { useState } from "react";

export default function ProductImage({ images, alt, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleError = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!images || images.length === 0) {
    return <div className="image-placeholder">No Image</div>;
  }

  return (
    <img
      className={`product-card-image ${className}`}
      src={images[currentIndex]}
      alt={alt}
      onError={handleError}
    />
  );
}
