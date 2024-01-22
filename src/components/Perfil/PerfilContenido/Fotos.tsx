// Fotos.tsx
import React, { useEffect, useState } from 'react';
import './PerfilContenido.css';
import { getPerfil } from '../../../services';
import { InfoPerfil } from '../../../models';
import { useLocation } from 'react-router-dom';

import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { ModalImagenesDos } from '../../ModalImagenes';

const Fotos: React.FC = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);
    const userState = useSelector((store: AppStore) => store.user);


    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(idPerfil), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setPerfil(fetchedPerfiles[0]); 
                } else {
                    setPerfil(null); 
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        fetchPerfil();
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 650;
        }
    }, [idPerfil]);

    return (
        <div className='Fotos' id='Fotos'>
            <h2>Fotos</h2>
            <div className="Fotos-content">
                {perfil?.PerfilImagenes.slice().reverse().map((imageUrl, index, array) => (
                    <img
                        key={array.length - 1 - index}
                        src={imageUrl.url}
                        alt={`Hormiga ${array.length - 1 - index}`}
                        onClick={() => openModal(array.length - 1 - index)}
                        loading="lazy"
                    />
                ))}
            </div>
            {selectedImageIndex !== null && (
                <ModalImagenesDos
                    imageUrls={perfil?.PerfilImagenes ?? []}
                    currentIndex={selectedImageIndex}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Fotos;
