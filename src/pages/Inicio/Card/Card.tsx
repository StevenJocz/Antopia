import { format } from "date-fns";
import { Link } from "react-router-dom";
import { VideosYoutube } from "../../../components/Logout";
import { IonIcon } from "@ionic/react";
import { chatbubbleOutline, heart, ellipsisHorizontalCircleOutline, shareOutline } from 'ionicons/icons';
import IconAnt from '../../../assets/imagenes/IconAnts.png';
import IconHormiguero from '../../../assets/imagenes/hormiguero.png';
import Home from '../../../assets/imagenes/eco-home.png';
import '../../../components/Card/Card.css'
import { Tendencias } from "../../../components/Tendencias";
import { Slider } from "../../../components/Slider";
import { Recomendados } from "../../../components/Tiendas";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { usePublicaciones } from "../../../Context/PublicacionesContext";

const Card = () => {

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

    const calculateGridColumns = (imagenCount: number) => {
        return imagenCount === 1 ? '2fr' : 'repeat(2, 3fr)';
    };

    const renderRecomendados = (index: number) => {
        if (index > 0 && index % 3 === 0) {
            // Cada 5 publicaciones renderiza alternativamente Recomendados, Tendencias o Sugerencia
            const modulo = index / 3 % 3;
            switch (modulo) {
                case 0:
                    return <Slider idTipo={1} />;
                case 1:
                    return <Recomendados key={`recomendados-${index}`} />;
                case 2:
                    return <Tendencias key={`tendencias-${index}`} />;

                default:
                    return null;
            }
        }
        return null;
    }
    return (
        <div className="Card">
            {publicacionesOrdenadas.length > 0 ? (
                // Muestra los datos si hay elementos en publicacionesOrdenadas
                publicacionesOrdenadas.map((publicacion, index) => (
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
                                                <img key={imgIndex} src={imagen} alt={publicacion.Titulo} className={`imagen-${imgIndex + 1}`} />
                                            ))}
                                            {publicacion.ImagenesPublicacion.length > 2 && (
                                                <div className="ExtraImagesInfo" >
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
                                    {publicacion.InfoColonia.length > 0 && (
                                        <div className="InfoColonia">
                                            {publicacion.InfoColonia.map((info, infoIndex) => (
                                                <Link to={`/Home/Colonias/${info.id_colonies}/${encodeURIComponent(info.s_name.toLowerCase().replace(/ /g, '-'))}`} key={infoIndex}>
                                                    <div className='Card-Articulo_content-colonia'>
                                                        <img src={info.s_photo} alt="" />
                                                        <div style={{ backgroundColor: info?.points.toString() }}>
                                                            <p>{info.s_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

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
                                    <Link to={`/Inicio/Publicacion/${publicacion.IdPublicacion}/${encodeURIComponent(publicacion.Titulo.toLowerCase().replace(/ /g, '-'))}`}>
                                        <div className="content-icono" >
                                            <IonIcon className='footer_comentario-icono icono' icon={chatbubbleOutline} />
                                            <p> {publicacion.CantidadComentarios}</p>

                                        </div>

                                    </Link>
                                    <div className="content-icono">
                                        <IonIcon className='iconoMeGusta icono' icon={heart} />
                                        <p> {publicacion.Megustas}</p>
                                    </div>
                                    <IonIcon className='footer_share-icono icono' icon={shareOutline} />
                                    <IonIcon className='footer_action-icono icono' icon={ellipsisHorizontalCircleOutline}  />
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div >
                ))
            ) : (
                // Muestra un mensaje o componente alternativo si publicacionesOrdenadas está vacío
                <div className='Cargado-Card'>
                    <PropagateLoader color="#fff" speedMultiplier={1} size={30} />
                </div>
            )}

        </div >
    )
}

export default Card