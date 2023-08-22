
import { useEffect, useState } from 'react';
import { ModalImagenes } from '../ModalImagenes';
import Hormiga from '../../assets/imagenes/reina.png';
import './Perfil.css';
import { RoutePerfil } from '.';
import { Link, useLocation } from 'react-router-dom';
import { usePerfil } from '../../Context/PerfilContext';
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'
import notificacionesIcono from '../../assets/imagenes/megafono.png'

const Perfil = () => {

    const { getPerfilById } = usePerfil();

    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];

    const perfil = getPerfilById(Number(idPerfil));

    if (!perfil) {
        return (
            <div>
                <h1>Usuario no encontrado</h1>
            </div>
        )
    }

    const backgroundImageUrl = perfil?.ImagenPortada;
    const profileImageUrl = perfil?.ImagenPerfil || '';

    const back = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPositionY: '20%',
    };

    const [modalImage, setModalImage] = useState<string | null>(null);

    const openModal = (imageUrl: string) => {
        setModalImage(imageUrl);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);

    return (

        <div className="Perfil">
            <div className='Perfil-portada' style={back}></div>
            <div className='Perfil-contenido'>
                <div className='Perfil-Foto'>
                    <img
                        src={profileImageUrl}
                        alt=""
                        onClick={() => openModal(profileImageUrl)}
                    />
                </div>
                <div className='Perfil-Info'>
                    <div className='Perfil-Info-Nombre'>
                        <h2>{perfil?.NombrePerfil}</h2>
                        <img src={Hormiga} alt="" />
                    </div>
                    <p>{perfil?.Frase}</p>
                </div>
            </div>
            <nav>
                <ul>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil?.urlPerfil}`}><li><img src={notificacionesIcono} className="sidebar-icon" alt="" /> Publicaciones</li></Link>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil?.urlPerfil}/Fotos`}><li> <img src={fotoIcono} className="sidebar-icon" alt="" /> Fotos</li></Link>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil?.urlPerfil}/Diarios`}><li><img src={diarioIcono} className="sidebar-icon" alt="" />Diarios</li></Link>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil?.urlPerfil}/D`}><li><img src={hormigueroIcono} className="sidebar-icon" alt="" /> Colonia</li></Link>
                </ul>
            </nav>
            <div className='Perfil-contenido'>
                <RoutePerfil />
            </div>
            {modalImage && (
                <ModalImagenes imageUrls={[modalImage]} onClose={closeModal} />
            )}
        </div>
    );
}

export default Perfil;
