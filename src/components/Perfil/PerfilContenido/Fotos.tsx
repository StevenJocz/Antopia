import { useState } from 'react';
import './PerfilContenido.css'
import { ModalImagenes } from '../../ModalImagenes';

const Fotos = () => {
    // Array de URLs de imágenes (reemplaza con tus propias URLs)
    const imageUrls = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Camponotus_sp._ant.jpg/1200px-Camponotus_sp._ant.jpg",
        "https://www.nationalgeographic.com.es/medio/2020/11/13/hormiga-sobre-un-tallo_1a847635.jpg",
        "https://hips.hearstapps.com/hmg-prod/images/hormigas-647ee2b3b4567.jpeg",
        "https://cumbrepuebloscop20.org/wp-content/uploads/2023/06/ant.jpg",
        "https://4.bp.blogspot.com/-PFxjC6bw2LY/TgR6aabYTxI/AAAAAAAAA3M/CXteaNRkyZY/s1600/hormiga%2Bverde.jpg",
        "https://cdn0.ecologiaverde.com/es/posts/4/9/6/hormiga_bulldog_gigante_myrmecia_gulosa_3694_5_600.jpg",
        
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    const openModal = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
    };

    const closeModal = () => {
        setSelectedImageUrl(null);
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
                        onClick={() => openModal(imageUrl)}
                    />
                ))}
            </div>
            {selectedImageUrl && (
                <ModalImagenes imageUrls={imageUrls} onClose={closeModal} />
            )}
        </div>
    );
}

export default Fotos;
