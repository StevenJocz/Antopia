// Fotos.tsx
import React, { useEffect, useState } from 'react';
import './PerfilContenido.css';
import ModalImagenes from '../../ModalImagenes/ModalImagenes';
import { getPerfil } from '../../../services';
import { InfoPerfil } from '../../../models';
import { useLocation } from 'react-router-dom';

import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';

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
                const fetchedPerfiles = await getPerfil(Number(idPerfil),  userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setPerfil(fetchedPerfiles[0]); // Establece el perfil en el estado local
                } else {
                    setPerfil(null); // Establece el perfil como nulo si no se encontró ningún perfil
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        fetchPerfil();
    }, [idPerfil]);

    return (
        <div className='Fotos'>
            <h2>Fotos</h2>
            <div className="Fotos-content">
                {perfil?.PerfilImagenes.map((imageUrl, index) => (
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
                    imageUrls={perfil?.PerfilImagenes ?? []}
                    currentIndex={selectedImageIndex}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Fotos;
