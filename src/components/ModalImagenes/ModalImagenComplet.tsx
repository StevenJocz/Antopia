import React, {useState } from "react";
import "./ModalImagenes.css";
import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chevronForwardCircleOutline, chevronBackCircleOutline} from "ionicons/icons";


interface ImageModalProps {
    imageUrls: string[];
    currentIndex: number;
    onClose: () => void;
}

const ModalImagenComplet: React.FC<ImageModalProps> = ({ imageUrls, currentIndex, onClose }) => {

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
                <div className="ImageModal-content_cerrarDos">
                    <IonIcon
                        className="Icono-cerrar"
                        onClick={closeModal}
                        icon={closeCircleOutline}
                    />
                </div>
                <div className="ImageModal-content-body">
                    <div className="ImageModal-content-body-imagenDos">
                        {showArrows && (
                            <div className="ImageModal-content-body-icono ImageModal-content-body-icono-izquierda">
                                <IonIcon
                                    className="Icono-flecha Icono-izquierda"
                                    onClick={goToPreviousImage}
                                    icon={chevronBackCircleOutline}
                                />
                            </div>
                        )}
                        <div className="ImageModal-content-body-imagen-img">
                            <img
                                src={imageUrls[currentImageIndex]}
                                alt=""
                                className="ImageModal-image"
                                loading="lazy"
                            />
                        </div>
                        {showArrows && (
                            <div className="ImageModal-content-body-icono  ImageModal-content-body-icono-derecha">
                                <IonIcon
                                    className="Icono-flecha Icono-derecha"
                                    onClick={goToNextImage}
                                    icon={chevronForwardCircleOutline}
                                />
                            </div>
                        )}

                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default ModalImagenComplet