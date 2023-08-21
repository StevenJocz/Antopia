import React, { useState, useCallback, lazy } from 'react';
import './Card.css';
import { IonIcon } from '@ionic/react';
import { chatboxOutline, addCircleOutline, heart } from 'ionicons/icons';
import { CardComentarios } from '../CardComentarios';
import { Acciones } from '../Acciones';
import { format } from 'date-fns';
import IconAnt from '../../assets/imagenes/IconAnts.png';
import IconHormiguero from '../../assets/imagenes/hormiguero.png';
import Home from '../../assets/imagenes/eco-home.png';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { Comentario } from '../../models';
import { Link } from 'react-router-dom';

const VideosYoutube = lazy(() => import('../Logout/VideosYoutube'));

const Card: React.FC = () => {

    const [verComentarios, setVerComentarios] = useState(false);
    const [verAcciones, setVerAcciones] = useState<{ [key: number]: boolean }>({});
    const [objetoComentarios, setObjetoComentarios] = useState<Comentario[]>([]);
    const [idPublicacion, setIdPublicacion] = useState(0);
    const { publicaciones } = usePublicaciones();
    const [leermasStates, setLeermasStates] = useState<{ [key: number]: boolean }>({});

    const handleLeermas = (idPublicacion: number) => {
        setLeermasStates(prevStates => ({
            ...prevStates,
            [idPublicacion]: !prevStates[idPublicacion]
        }));
    };


    const publicacionesOrdenadas = [...publicaciones].sort(
        (a, b) => new Date(b.FechaPublicacion).getTime() - new Date(a.FechaPublicacion).getTime()
    );

    const toggleComentarios = useCallback(
        (comentarios: Comentario[], idPublicacion: number) => {
            setObjetoComentarios(comentarios);
            setIdPublicacion(idPublicacion);
            setVerComentarios(true);
        },
        []
    );

    const handleAcciones = (idPublicacion: number) => {
        setVerAcciones(prevStates => ({
            ...prevStates,
            [idPublicacion]: !prevStates[idPublicacion]
        }));
    };


    return (
        <div className="Card">
            {publicacionesOrdenadas.map(publicacion => (
                <div className="Card-content" key={publicacion.IdPublicacion}>
                    <article
                        className={`Card-Articulo borde-${publicacion.IdTipo === 1 ? "Uno" :
                            publicacion.IdTipo === 2 ? "dos" :
                                publicacion.IdTipo === 3 ? "tres" :
                                    "home"}`}
                    >
                        <div className="Card-Articulo_header">
                            <div className="header_Perfil">
                                <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                    <img src={publicacion.ImagenPerfil} alt="" />
                                </Link>
                                <div>
                                    <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                        <h3>{publicacion.NombrePerfil}</h3>
                                    </Link>
                                    <p>{format(new Date(publicacion.FechaPublicacion), "d 'de' MMMM 'a las' HH:mm")}</p>
                                </div>
                            </div>
                            <div className="header_calificacion">
                                <IonIcon className='iconoMeGusta like' icon={heart} />
                                <p>
                                    {publicacion.Megustas} me gustas /{" "}
                                    <span onClick={() => toggleComentarios(publicacion.Comentarios, publicacion.IdPublicacion)}>
                                        ({publicacion.CantidadComentarios} comentarios)
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='Card-Articulo_content'>
                            <h1>{publicacion.Titulo}</h1>
                            <p className={leermasStates[publicacion.IdPublicacion] ? 'show-full' : ''}>
                                {publicacion.Contenido.split(' ').map((word, index) => {
                                    if (word.startsWith('#')) {
                                        const hashtag = word.substring(1);
                                        return (
                                            <span className='hashtag' key={index}>
                                                <Link to={`/hashtags/${hashtag}`}>
                                                    #{hashtag}
                                                </Link>{' '}
                                            </span>
                                        );
                                    }
                                    return `${word} `;
                                })}
                            </p>
                            <button className='vermas' onClick={() => handleLeermas(publicacion.IdPublicacion)}>
                                {leermasStates[publicacion.IdPublicacion] ? 'Leer menos' : 'Leer más'}
                            </button>
                            {Object.values(publicacion.ImagenesPublicacion).some(imagen => imagen !== "") && (
                                <div>
                                    {Object.values(publicacion.ImagenesPublicacion).map((imagen, index) => (
                                        <img key={index} src={imagen} alt={`Imagen ${index}`} />
                                    ))}
                                </div>
                            )}
                            {publicacion.UrlYoutube !== '' && (
                                <div className='Card-Articulo_content-youtbe'>
                                    <VideosYoutube videoUrl={publicacion.UrlYoutube} />
                                </div>
                            )}
                        </div>
                        <div className="Card-Articulo_footer">
                            <div className='footer_action'>
                                <div>
                                    <button onClick={() => toggleComentarios(publicacion.Comentarios, publicacion.IdPublicacion)}>
                                        <IonIcon icon={chatboxOutline} /> Comentar
                                    </button>
                                </div>
                                <div onClick={() => handleAcciones(publicacion.IdPublicacion)}>
                                    <IonIcon className='iconoPlus' icon={addCircleOutline} />
                                </div>
                            </div>
                        </div>
                        {verAcciones[publicacion.IdPublicacion] && (
                            <Acciones mostrarAcciones={() => handleAcciones(publicacion.IdPublicacion)} />
                        )}
                    </article>
                    <div
                        className={`Card-content_footer footer-borde-${publicacion.IdTipo === 1 ? "Uno" :
                            publicacion.IdTipo === 2 ? "dos" :
                                publicacion.IdTipo === 3 ? "tres" :
                                    "home"}`}
                    >
                        <img
                            src={
                                publicacion.IdTipo === 1 ? IconAnt :
                                    publicacion.IdTipo === 2 ? IconHormiguero :
                                        publicacion.IdTipo === 3 ? IconAnt :
                                            Home
                            }
                            alt=""
                        />
                        <a href="">
                            {publicacion.IdTipo === 1 ? "Cría de Hormigas" :
                                publicacion.IdTipo === 2 ? "Construcción de hormigueros" :
                                    publicacion.IdTipo === 3 ? "Experimentos y técnicas" :
                                        "Otros"}
                        </a>
                    </div>
                </div>
            ))}
            {verComentarios && (
                <CardComentarios mostrarComentarios={() => setVerComentarios(false)} comentarios={objetoComentarios} idPublicacion={idPublicacion} />
            )}
        </div>
    );
};

export default Card;
