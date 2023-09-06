import { RoutePerfil } from '.';
import { Link, useLocation } from 'react-router-dom';
import { usePerfil } from '../../Context/PerfilContext';
import { useEffect, useState } from 'react';

import { IonIcon } from "@ionic/react";
import { imageOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';

import Hormiga from '../../assets/imagenes/reina.png';
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'
import notificacionesIcono from '../../assets/imagenes/megafono.png'

import { AppStore } from '../../redux/store';
import { useSelector } from 'react-redux';
import Configuracion from '../Configuracion/Configuracion';
import './Perfil.css';


const Perfil = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const { getPerfilById } = usePerfil();
    const [verEditarPerfil, setVereditarPerfil] = useState(false);
    const [verConfiguracion, setVerConfiguracion] = useState(false);
    const [tipo, setTipo] = useState(0);

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

    const toggleConfiguracion = (tipo: number) => {
        setTipo(tipo);
        setVerConfiguracion(true);
    };

    useEffect(() => {
        if (Number(idPerfil) === Number(userState.IdPerfil)) {
            setVereditarPerfil(true);
        } else {
            setVereditarPerfil(false);
        }

        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }

    }, [idPerfil, userState.IdPerfil]);

    return (

        <div className="Perfil">
            <div className='Perfil-portada' style={back}>
                {verEditarPerfil && (
                    <div className='Cambio__Perfil-portada' onClick={() => toggleConfiguracion(3)}>
                        <IonIcon icon={imageOutline} />
                    </div>
                )}
            </div>
            <div className='Perfil-contenido'>
                <div className='Perfil-Foto'>
                    <img
                        src={profileImageUrl}
                        alt=""
                    />
                    {verEditarPerfil && (
                        <div className='Cambio__Perfil-Foto'>
                            <div className='Cambio__Perfil-Foto-Contenido' onClick={() => toggleConfiguracion(2)}>
                                <IonIcon className='Cambio__Perfil-Foto-Icon' icon={imageOutline} />
                                <p>Cambiar foto de perfil</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='Perfil-Info'>
                    <div className='Perfil-Info-Nombre'>
                        <div>
                            <h2>{perfil?.NombrePerfil}</h2>
                            <img src={Hormiga} alt="" />
                        </div>
                        {!verEditarPerfil && (
                            <button> Seguir</button>
                        )}
                    </div>
                    <div className='Perfil-Info-frase'>
                        <p>{perfil?.Frase}</p>
                        {verEditarPerfil && (
                            <IonIcon className='Perfil-Info-frase-icono' onClick={() => toggleConfiguracion(1)} icon={ellipsisHorizontalCircleOutline} />
                        )}
                    </div>
                    <div className='Perfil-Info-Datos'>
                        <p><span>100</span> publicaciones</p>
                        <p><span>1000</span> seguidores</p>
                    </div>

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
            {verConfiguracion && (
                <Configuracion
                    mostrarConfiguracion={() => setVerConfiguracion(false)}
                    idPerfil={userState.IdPerfil}
                    tipo={tipo}
                    fotoPerfil={profileImageUrl}
                    fotoFondo={backgroundImageUrl}
                />
            )}

        </div>
    );
}

export default Perfil;
