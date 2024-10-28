/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import '../../../styles/commonStyles.css';
import '../styles/interactiveStyles.css';

interface ImageLightboxProps {
  imageSrc: string;
  altText: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageSrc, altText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="image-lightbox">
      <img
        src={imageSrc}
        alt={altText}
        className="cursor-pointer w-full h-auto rounded-lg"
        onClick={handleOpen}
      />
      {isOpen && (
        <div className="lightbox-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="lightbox-content relative">
            <button
              className="lightbox-close absolute top-4 right-4 text-white text-3xl focus:outline-none"
              onClick={handleClose}
            >
              &times;
            </button>
            <img src={imageSrc} alt={altText} className="w-auto h-auto max-w-full max-h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;