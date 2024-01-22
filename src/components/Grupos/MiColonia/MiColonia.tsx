
import { Link, useLocation } from 'react-router-dom';
import './MiColonia.css'
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getMiColonia } from '../../../services';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { Colonia } from '../../../models';
import { MicoloniaRouter } from './MicoloniaRouter';
import { PostUnirmeColonia } from '../../../services';
import { Helmet } from 'react-helmet';
import { PublicacionesProvider } from '../../../Context/PublicacionesContext';
import { NuevoPost } from '../../NuevoPost';
import { ChatColonia } from '../../Chat';

const MiColonia = () => {

    const userState = useSelector((store: AppStore) => store.user);
    const [grupo, setGrupo] = useState<Colonia | null>(null);
    const [esMiembro, setEsMiembro] = useState<number>(0);
    const location = useLocation();
    const [verChatColonia, setVerChatColonia] = useState(false);

    const handdleVerChatColonia = () => {
        setVerChatColonia(!verChatColonia);
    };
    const idgrupo = location.pathname.split("/")[3];
    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getMiColonia(Number(idgrupo), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setGrupo(fetchedPerfiles[0]);
                    setEsMiembro(fetchedPerfiles[0]?.esmember || 0);

                } else {
                    setGrupo(null);
                }
            } catch (error) {
                console.error('Error al obtener el grupo:', error);
            }
        }

        fetchPerfil();
    }, [idgrupo]);


    const backgroundImageUrl = grupo?.s_photo;
    const back = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPositionY: '75%',
    };


    const handleUnirmeColonia = async () => {
        try {
            const resultado = await PostUnirmeColonia(grupo?.id_colonies || 0, userState.IdPerfil, esMiembro);
            if (resultado.resultado == true && esMiembro == 1) {
                setEsMiembro(0)
            } else if (resultado.resultado == true && esMiembro == 0) {
                setEsMiembro(1)
            }
            window.location.reload();
        } catch (error) {
        }
    }

    // Obtener las primeras 8 imágenes
    const primerasOchoImagenes = grupo?.userMembers.slice(0, 6) || [];

    // Obtener el número de imágenes restantes
    const imagenesRestantes = grupo?.userMembers.slice(6) || [];

    return (
        <>
            <Helmet>
                <title>Antopia | Colonia </title>
            </Helmet>
            <div className='MiGrupo'>
                <div className="MiGrupo-portada" style={back}>
                    <div className='MiGrupo-navegacion'>
                        <Link to={`/Home/Colonias`} >
                            <IonIcon className='volver-icono' icon={arrowBack} />
                            <p>Volver</p>
                        </Link>
                    </div>
                    <div className='MiGrupo-puntos'>
                        <p>{grupo?.points} <span>puntos</span></p>
                    </div>
                    <div className="MiGrupo-info" style={{ backgroundColor: grupo?.s_colors }}>
                        <h2>{grupo?.s_name}</h2>
                        <p>{grupo?.s_description}</p>
                        <div className='MiGrupo-info-content'>
                            <div className='MiGrupo-user'>
                                {primerasOchoImagenes.map((miembro) => (
                                    <img src={miembro.foto} alt={miembro.nombre} key={miembro.id_user} loading="lazy" />
                                ))}
                                {imagenesRestantes.length > 0 && (
                                    <p> + {imagenesRestantes.length} {imagenesRestantes.length === 1 ? 'miembro' : 'miembros'}</p>
                                )}
                            </div>

                            <div className='Compartir-Grupo'>
                                <button className='MiGrupo-btn' onClick={handleUnirmeColonia}>{esMiembro == 1 ? 'Abandonar' : 'Unirme'}</button>
                                {esMiembro == 1 && (
                                    <button className='MiGrupo-btn' onClick={handdleVerChatColonia}>Chat</button>
                                )}

                                <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={1} hashtag="">
                                    <NuevoPost tipo={6} idColonia={parseInt(idgrupo)} />
                                </PublicacionesProvider>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='MiGrupo-Menu'>
                    <ul>
                        <Link to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/`}><li>Conversación</li></Link>
                        <Link
                            to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/fotos`}
                        ><li>Imagenes</li>
                        </Link>
                        <Link to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/about`}><li>Acerca de</li></Link>
                    </ul>
                </div>
                <div>
                    <MicoloniaRouter grupo={grupo} />
                </div>
                {verChatColonia && (
                    <div className='Chat'>
                        <div className='Chat-center'>
                            <ChatColonia
                                idColonia={parseInt(idgrupo)}
                                handleVerColonia={handdleVerChatColonia}
                                handleVerPerviaChat={handdleVerChatColonia}

                            />
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}

export default MiColonia