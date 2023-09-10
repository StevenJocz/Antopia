import { useState, useCallback, lazy } from 'react';
import './Card.css';
import { IonIcon } from '@ionic/react';
import { chatboxOutline, addCircleOutline } from 'ionicons/icons';
import { CardComentarios } from '../CardComentarios';
import { Acciones } from '../Acciones';
import { format, } from 'date-fns';
import IconAnt from '../../assets/imagenes/IconAnts.png';
import IconHormiguero from '../../assets/imagenes/hormiguero.png';
import Home from '../../assets/imagenes/eco-home.png';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { Comentario } from '../../models';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { ModalImagenes } from '../ModalImagenes';
import Like from '../Like/Like';
import { Level } from '../Level';

const VideosYoutube = lazy(() => import('../Logout/VideosYoutube'));


const Card = () => {

    const [verComentarios, setVerComentarios] = useState(false);
    const [verAcciones, setVerAcciones] = useState<{ [key: number]: boolean }>({});
    const [objetoComentarios, setObjetoComentarios] = useState<Comentario[]>([]);
    const [idPublicacion, setIdPublicacion] = useState(0);
    const { publicaciones } = usePublicaciones();
    const [leermasStates, setLeermasStates] = useState<{ [key: number]: boolean }>({});
    const userState = useSelector((store: AppStore) => store.user);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const openModal = (index: number, imagen: string[]) => {
        setSelectedImageIndex(index);
        setSelectedImage(imagen);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

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

    const calculateGridColumns = (imagenCount: number) => {
        // Si solo hay una imagen, usar una sola columna, de lo contrario, usar dos
        return imagenCount === 1 ? '1fr' : 'repeat(2, 1fr)';
    };

    return (
        <div className="Card">
            {publicacionesOrdenadas.map((publicacion) => (
                <div className="Card-content" key={publicacion.IdPublicacion}>
                    <article
                        className={`Card-Articulo borde-${publicacion.IdTipo === 2 ? "Uno" :
                            publicacion.IdTipo === 3 ? "dos" :
                                publicacion.IdTipo === 4 ? "tres" :
                                    "home"}`}
                    >
                        <div className="Card-Articulo_header">
                            <div className="header_Perfil">
                                <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                    <img src={publicacion.ImagenPerfil} alt={publicacion.NombrePerfil} />
                                </Link>
                                <div>
                                    <div className='Card-Articulo_header-nombre'>
                                        <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                            <h3>{publicacion.NombrePerfil}</h3>
                                        </Link>
                                        <Level idlevel={publicacion.Level} />
                                        {publicacion.IdPerfil !== userState.IdPerfil && publicacion.Siguiendo === 1 && (
                                            <p className='siguiendo'>Siguiendo</p>
                                        )}
                                    </div>

                                    <p>{format(new Date(publicacion.FechaPublicacion), "dd 'de' MMMM 'a las' HH:mm")}</p>
                                </div>
                            </div>
                            <div className="header_calificacion">
                                <Like idPublicacion={publicacion.IdPublicacion} idperfil={userState.IdPerfil} UserLikes={publicacion.UserLikes} />
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
                                                <Link to={`Hashtag/${hashtag}`}>
                                                    #{hashtag}
                                                </Link>{' '}
                                            </span>
                                        );
                                    }
                                    return `${word} `;
                                })}
                            </p>
                            {publicacion.Contenido.length > 200 && (
                                <button className='vermas' onClick={() => handleLeermas(publicacion.IdPublicacion)}>
                                    {leermasStates[publicacion.IdPublicacion] ? 'Leer menos' : 'Leer más'}
                                </button>
                            )}
                            {publicacion.ImagenesPublicacion.length > 0 && (
                                <div className="Card-ImagenesPublicacion"
                                    style={{ gridTemplateColumns: calculateGridColumns(publicacion.ImagenesPublicacion.length) }}
                                >
                                    {publicacion.ImagenesPublicacion.map((imagen, index) => (
                                        <img key={index} src={imagen} alt={publicacion.Titulo} onClick={() => openModal(index, publicacion.ImagenesPublicacion)} />
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
                        className={`Card-content_footer footer-borde-${publicacion.IdTipo === 2 ? "Uno" :
                            publicacion.IdTipo === 3 ? "dos" :
                                publicacion.IdTipo === 4 ? "tres" :
                                    "home"}`}
                    >
                        <img
                            src={
                                publicacion.IdTipo === 2 ? IconAnt :
                                    publicacion.IdTipo === 3 ? IconHormiguero :
                                        publicacion.IdTipo === 4 ? IconAnt :
                                            Home
                            }
                            alt=""
                        />
                        <a href="">
                            {publicacion.IdTipo === 2 ? "Cría de Hormigas" :
                                publicacion.IdTipo === 3 ? "Construcción de hormigueros" :
                                    publicacion.IdTipo === 4 ? "Experimentos y técnicas" :
                                        "General"}
                        </a>
                    </div>
                </div>
            ))}
            {verComentarios && (
                <CardComentarios mostrarComentarios={() => setVerComentarios(false)} comentarios={objetoComentarios} idPublicacion={idPublicacion} />
            )}

            {selectedImageIndex !== null && (
                <ModalImagenes
                    imageUrls={selectedImage}
                    currentIndex={selectedImageIndex}
                    onClose={closeModal}
                />
            )}

        </div>
    );
};

export default Card;
