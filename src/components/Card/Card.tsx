import { useState, useCallback } from 'react';
import './Card.css';
import { IonIcon } from '@ionic/react';
import { chatbubbleOutline, shareOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';
import { CardComentarios } from '../CardComentarios';
import { Acciones } from '../Acciones';
import AccionesDos from '../Acciones/AccionesDos';
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
import VideosYoutube from '../Logout/VideosYoutube';
import { Recomendados } from '../Tiendas';
import { Tendencias } from '../Tendencias';
import { PreviewPerfil } from '../Perfil/PreviewPerfil';


const Card = () => {

    const [verComentarios, setVerComentarios] = useState(false);
    const [verAcciones, setVerAcciones] = useState<{ [key: number]: boolean }>({});
    const [verAccionesDos, setVerAccionesDos] = useState<{ [key: number]: boolean }>({});
    const [objetoComentarios, setObjetoComentarios] = useState<Comentario[]>([]);
    const [idPublicacion, setIdPublicacion] = useState(0);
    const [tituloPublicacion, setTituloPublicacion] = useState('');
    const [idPublicacionImagenes, setIdPublicacionImagenes] = useState(0);
    const { publicaciones } = usePublicaciones();
    const [leermasStates, setLeermasStates] = useState<{ [key: number]: boolean }>({});
    const userState = useSelector((store: AppStore) => store.user);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});


    const handleMouseEnter = (idPublicacion: number, idPerfil: number) => {
        if (userState.IdPerfil != idPerfil) {
            setIsHovered((prevStates) => ({
                ...prevStates,
                [idPublicacion]: true,
            }));
        }
    };

    const handleMouseLeave = (idPublicacion: number) => {
        setIsHovered((prevStates) => ({
            ...prevStates,
            [idPublicacion]: false,
        }));
    };

    const openModal = (index: number, imagen: string[], idPublicacion: number,) => {
        setSelectedImageIndex(index);
        setSelectedImage(imagen);
        setIdPublicacionImagenes(idPublicacion);
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
        (comentarios: Comentario[], idPublicacion: number, TituloPublicacion: string) => {
            setObjetoComentarios(comentarios);
            setIdPublicacion(idPublicacion);
            setTituloPublicacion(TituloPublicacion);
            setVerComentarios(true);
        },
        []
    );

    const handleAcciones = (idPublicacion: number) => {
        setVerAcciones(prevStates => ({
            ...prevStates,
            [idPublicacion]: !prevStates[idPublicacion]
        }));

        if (verAccionesDos[idPublicacion]) {
            setVerAccionesDos(prevStates => ({
                ...prevStates,
                [idPublicacion]: false
            }));
        }
    };


    const handleAccionesDos = (idPublicacion: number) => {
        setVerAccionesDos(prevStates => ({
            ...prevStates,
            [idPublicacion]: !prevStates[idPublicacion]
        }));
        if (verAcciones[idPublicacion]) {
            setVerAcciones(prevStates => ({
                ...prevStates,
                [idPublicacion]: false
            }));
        }
    };

    const calculateGridColumns = (imagenCount: number) => {
        return imagenCount === 1 ? '2fr' : 'repeat(2, 3fr)';
    };

    const renderRecomendados = (index: number) => {
        if (index > 0 && index % 4 === 0) {
            // Cada 5 publicaciones renderiza alternativamente Recomendados, Tendencias o Sugerencia
            const modulo = index / 4 % 4;
            switch (modulo) {
                case 0:
                    return <Recomendados key={`recomendados-${index}`} />;
                case 1:
                    return <img className='imgen-barner' src="https://quillants.co/wp-content/uploads/2018/06/banner-950x122-1.jpg" alt="" key={`tendencias-${index}`} />;

                case 2:
                    return <Tendencias key={`tendencias-${index}`} />;
                case 3:
                    return <img className='imgen-barner' src=" https://anthouse.es/img/cms/img%20seo/terrario-para-hormigas-casero.png" alt="" key={`tendencias-${index}`} />;

                default:
                    return null;
            }
        }
        return null;
    }

    return (
        <div className="Card">
            {publicacionesOrdenadas.map((publicacion, index) => (
                <div key={publicacion.IdPublicacion}>  
                {renderRecomendados(index)}

                    <div className="Card-content" >
                        <article
                            className={`Card-Articulo borde-${publicacion.IdTipo === 2 ? "Uno" :
                                publicacion.IdTipo === 3 ? "dos" :
                                    publicacion.IdTipo === 4 ? "tres" :
                                        "home"}`}
                        >
                            <div className="Card-Articulo_header"
                                onMouseEnter={() => handleMouseEnter(publicacion.IdPublicacion, publicacion.IdPerfil)}
                                onMouseLeave={() => handleMouseLeave(publicacion.IdPublicacion)}

                            >

                                <div className="header_Perfil">
                                    <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                        <img src={publicacion.ImagenPerfil} alt={publicacion.NombrePerfil} />
                                    </Link>
                                    <div>
                                        <div className='Card-Articulo_header-nombre'>
                                            <Link to={`/Home/Perfil/${publicacion.IdPerfil}/${publicacion.urlPerfil}`}>
                                                <h3>{publicacion.NombrePerfil}</h3>
                                            </Link>
                                        </div>
                                        <p>{format(new Date(publicacion.FechaPublicacion), "dd 'de' MMMM 'a las' HH:mm")}</p>
                                    </div>
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
                                                    <Link to={`/Home/Hashtag/${hashtag}`}>
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

                                        {publicacion.ImagenesPublicacion.slice(0, 2).map((imagen, imgIndex) => (
                                            <img key={imgIndex} src={imagen} alt={publicacion.Titulo} className={`imagen-${imgIndex + 1}`} onClick={() => openModal(imgIndex, publicacion.ImagenesPublicacion, publicacion.IdPublicacion)} />
                                        ))}
                                        {publicacion.ImagenesPublicacion.length > 2 && (
                                            <div className="ExtraImagesInfo" onClick={() => openModal(2, publicacion.ImagenesPublicacion, publicacion.IdPublicacion)}>
                                                <p>+{publicacion.ImagenesPublicacion.length - 2} </p>
                                                <img src={publicacion.ImagenesPublicacion[2]} alt={publicacion.Titulo} className={`imagen-5`} />
                                            </div>
                                        )}
                                    </div>
                                )}
                                {publicacion.UrlYoutube !== '' && (
                                    <div className='Card-Articulo_content-youtbe'>
                                        <VideosYoutube videoUrl={publicacion.UrlYoutube} />
                                    </div>
                                )}
                            </div>
                            {verAcciones[publicacion.IdPublicacion] && (
                                <Acciones mostrarAcciones={() => handleAcciones(publicacion.IdPublicacion)}
                                    titulo={publicacion.Titulo} idPublicacion={publicacion.IdPublicacion} />
                            )}
                            {verAccionesDos[publicacion.IdPublicacion] && (
                                <AccionesDos mostrarAccionesDos={() => handleAccionesDos(publicacion.IdPublicacion)}
                                    idUser={publicacion.IdPerfil} idPublicacion={publicacion.IdPublicacion} />
                            )}
                        </article>
                        <div className={`Card-content_footer footer-borde-${publicacion.IdTipo === 2 ? "Uno" :
                            publicacion.IdTipo === 3 ? "dos" :
                                publicacion.IdTipo === 4 ? "tres" :
                                    "home"}`}
                        >
                            <div className='Cardstile'>
                                <img
                                    src={
                                        publicacion.IdTipo === 2 ? IconAnt :
                                            publicacion.IdTipo === 3 ? IconHormiguero :
                                                publicacion.IdTipo === 4 ? IconAnt :
                                                    Home
                                    }
                                    alt=""
                                />
                                <p>
                                    {publicacion.IdTipo === 2 ? "Cría de Hormigas" :
                                        publicacion.IdTipo === 3 ? "Construcción de hormigueros" :
                                            publicacion.IdTipo === 4 ? "Experimentos y técnicas" :
                                                publicacion.IdTipo === 5 ? "Colonia" :
                                                    "General"}
                                </p>
                            </div>
                            <div className='footer_action'>
                                <div className="content-icono" onClick={() => toggleComentarios(publicacion.Comentarios, publicacion.IdPublicacion, publicacion.Titulo)}>
                                    <IonIcon className='footer_comentario-icono icono' icon={chatbubbleOutline} />
                                    <p> {publicacion.CantidadComentarios}</p>
                                </div>
                                <div className="content-icono">
                                    <Like idPublicacion={publicacion.IdPublicacion} idperfil={userState.IdPerfil} UserLikes={publicacion.UserLikes} />
                                    <p> {publicacion.Megustas}</p>
                                </div>
                                <IonIcon className='footer_share-icono icono' icon={shareOutline} onClick={() => handleAcciones(publicacion.IdPublicacion)} />
                                <IonIcon className='footer_action-icono icono' icon={ellipsisHorizontalCircleOutline} onClick={() => handleAccionesDos(publicacion.IdPublicacion)}   />

                            </div>
                        </div>
                        <div>
                        </div>
                        {isHovered[publicacion.IdPublicacion]  && <PreviewPerfil idPerfil={publicacion.IdPerfil} idPublicacion={publicacion.IdPublicacion} urlPerfil={publicacion.urlPerfil} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />}
                    </div>
                </div>
            ))}
            {verComentarios && (
                <CardComentarios mostrarComentarios={() => setVerComentarios(false)} comentarios={objetoComentarios} idPublicacion={idPublicacion} TituloPublicacion={tituloPublicacion} />
            )}
            {selectedImageIndex !== null && (
                <ModalImagenes
                    imageUrls={selectedImage}
                    currentIndex={selectedImageIndex}
                    onClose={closeModal}
                    idPublicacion={idPublicacionImagenes}
                />
            )}
        </div>
    );
};

export default Card;
