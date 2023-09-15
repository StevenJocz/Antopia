import { RoutePerfil } from '.';
import { Link, useLocation } from 'react-router-dom';
import { getPerfil } from '../../services/Perfil.service';
import { useEffect, useState } from 'react';

import { IonIcon } from "@ionic/react";
import { imageOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';

import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import notificacionesIcono from '../../assets/imagenes/megafono.png'

import { AppStore } from '../../redux/store';
import { useSelector } from 'react-redux';
import Configuracion from '../Configuracion/Configuracion';
import { InfoPerfil } from '../../models';
import { BotonFollowers } from '../BotonFollowers';
import { Followers } from '../Followers';

import './Perfil.css'
import { Level } from '../Level';
import { PropagateLoader } from 'react-spinners';

const Perfil = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [verEditarPerfil, setVerEditarPerfil] = useState(false);
    const [verConfiguracion, setVerConfiguracion] = useState(false);
    const [followers, setFollowers] = useState(false);
    const [tipo, setTipo] = useState(0);
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);
    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(idPerfil), userState.IdPerfil);
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

    useEffect(() => {
        if (perfil && Number(idPerfil) === Number(userState.IdPerfil)) {
            setVerEditarPerfil(true);
        } else {
            setVerEditarPerfil(false);
        }

    }, [idPerfil, userState.IdPerfil, perfil]);

    if (perfil === null) {
        return (
            <div className='PropagateLoader'>
                <PropagateLoader color="#fff" speedMultiplier={1} size={30} />
            </div>
        )
    }

    const backgroundImageUrl = perfil.ImagenPortada;
    const profileImageUrl = perfil.ImagenPerfil || '';

    const back = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPositionY: '35%',
    };

    const toggleConfiguracion = (tipo: number) => {
        setTipo(tipo);
        setVerConfiguracion(true);
    };

    const toggleFollowers = () => {
        setFollowers(!followers);
    };


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
                            <h2>{perfil.NombrePerfil}</h2>
                            <Level idlevel={perfil.Level} />
                        </div>
                        {!verEditarPerfil && (
                            <BotonFollowers idPerfil={parseInt(idPerfil)} idSeguidor={userState.IdPerfil} Siguiendo={perfil.Siguiendo} />
                        )}
                    </div>
                    <div className='Perfil-Info-frase'>
                        <p>{perfil.Frase}</p>
                        {verEditarPerfil && (
                            <IonIcon className='Perfil-Info-frase-icono' onClick={() => toggleConfiguracion(1)} icon={ellipsisHorizontalCircleOutline} />
                        )}
                    </div>
                    <div className='Perfil-Info-Datos'>
                        <p><span>{perfil.CantidadPublicaciones}</span> publicaciones</p>
                        <p className='Perfil-Info-Datos-seguidores' onClick={toggleFollowers}><span>{perfil.Seguidores}</span> seguidores</p>
                    </div>

                </div>
            </div>
            <nav>
                <ul>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil.urlPerfil}`}><li><img src={notificacionesIcono} className="sidebar-icon" alt="" /> Publicaciones</li></Link>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil.urlPerfil}/Fotos`}><li> <img src={fotoIcono} className="sidebar-icon" alt="" /> Fotos</li></Link>
                    <Link to={`/Home/Perfil/${idPerfil}/${perfil.urlPerfil}/Diarios`}><li><img src={diarioIcono} className="sidebar-icon" alt="" />Diarios</li></Link>
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
            {followers && (
                <Followers idUser={parseInt(idPerfil)} mostrarFollowers={() => setFollowers(false)}/>
            )}

        </div>
    );
}

export default Perfil;
