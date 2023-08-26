// Fotos.tsx
import React, { useState } from 'react';
import './PerfilContenido.css'; 
import ModalImagenes from '../../ModalImagenes/ModalImagenes';
import { useImageUrls } from '../../../Context/FotosContext';

const Fotos: React.FC = () => {
    const imageUrls = useImageUrls();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    return (
        <div className='Fotos'>
            <h2>Fotos</h2>
            <div className="Fotos-content">
                {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Hormiga ${index}`}
                        onClick={() => openModal(index)}
                    />
                ))}
            </div>
            {selectedImageIndex !== null && (
                <ModalImagenes
                    imageUrls={imageUrls}
                    currentIndex={selectedImageIndex}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Fotos;
