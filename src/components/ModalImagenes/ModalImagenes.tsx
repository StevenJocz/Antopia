import React, { useState } from "react";
import "./ModalImagenes.css";
import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chevronForwardCircleOutline, chevronBackCircleOutline } from "ionicons/icons";

interface ImageModalProps {
  imageUrls: string[];
  currentIndex: number;
  onClose: () => void;
}

const ModalImagenes: React.FC<ImageModalProps> = ({ imageUrls, currentIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };


  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  const showArrows = imageUrls.length > 1;

  return (
    <div className={`ImageModal ${isModalOpen ? "open" : ""}`}>
      <div className="ImageModal-content">
        <div className="ImageModal-content_cerrar">
          <IonIcon
            className="Icono-cerrar"
            onClick={closeModal}
            icon={closeCircleOutline}
          />
        </div>
        {showArrows && (
          <IonIcon
            className="Icono-flecha Icono-izquierda"
            onClick={goToPreviousImage}
            icon={chevronBackCircleOutline}
          />
        )}
        <img
          src={imageUrls[currentImageIndex]}
          alt=""
          className="ImageModal-image"
        />
        {showArrows && (
          <IonIcon
            className="Icono-flecha Icono-derecha"
            onClick={goToNextImage}
            icon={chevronForwardCircleOutline}
          />
        )}
      </div>
    </div>
  );
};

export default ModalImagenes;
