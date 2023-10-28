import React, { useEffect, useState } from "react";
import "./ModalImagenes.css";
import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chevronForwardCircleOutline, chevronBackCircleOutline, eyeOutline } from "ionicons/icons";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Level } from "../Level";
import Like from "../Like/Like";
import { PerfilImagenes, Publicacion } from "../../models";
import { getPublicaciones } from "../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import LikeComentarios from "../Like/LikeComentarios";

interface ImageModalProps {
    imageUrls: PerfilImagenes[];
    currentIndex: number;
    onClose: () => void;
}

const ModalImagenesDos: React.FC<ImageModalProps> = ({ imageUrls, currentIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const userState = useSelector((store: AppStore) => store.user);
    const [publicacion, setPublicacion] = useState<Publicacion[] | null>(null);


    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const goToPreviousImage = () => {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageUrls.length - 1;
        setCurrentImageIndex(newIndex);
        const idPublicacion = imageUrls[newIndex].idPublicacion;
        fetchPerfil(idPublicacion);
    };

    const goToNextImage = () => {
        const newIndex = currentImageIndex < imageUrls.length - 1 ? currentImageIndex + 1 : 0;
        setCurrentImageIndex(newIndex);
        const idPublicacion = imageUrls[newIndex].idPublicacion;
        fetchPerfil(idPublicacion);
    };

    useEffect(() => {
        fetchPerfil(imageUrls[currentImageIndex].idPublicacion);
    }, []);


    async function fetchPerfil(idPublicacion: number) {
        try {
            const resultado = await getPublicaciones(userState.IdPerfil, 6, idPublicacion, "0");
            setPublicacion(resultado);

        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    }


    const showArrows = imageUrls.length > 1;

    return (
        <div className={`ImageModal ${isModalOpen ? "open" : ""}`}>
            <div className="ImageModal-content">
                <div className="ImageModal-content_cerrar">
                    <IonIcon
                        className="Icono-cerrar"
                        onClick={closeModal}
                        icon={closeCircleOutline}
                    />
                </div>
                <div className="ImageModal-content-body">
                    <div className="ImageModal-content-body-imagen">
                        {showArrows && (
                            <div className="ImageModal-content-body-icono ImageModal-content-body-icono-izquierda">
                                <IonIcon
                                    className="Icono-flecha Icono-izquierda"
                                    onClick={() => goToPreviousImage()}
                                    icon={chevronBackCircleOutline}
                                />
                            </div>
                        )}
                        <div className="ImageModal-content-body-imagen-img">
                            <img
                                src={imageUrls[currentImageIndex].url}
                                alt=""
                                className="ImageModal-image"
                            />
                        </div>
                        {showArrows && (
                            <div className="ImageModal-content-body-icono  ImageModal-content-body-icono-derecha">
                                <IonIcon
                                    className="Icono-flecha Icono-derecha"
                                    onClick={() => goToNextImage()}
                                    icon={chevronForwardCircleOutline}
                                />
                            </div>
                        )}

                    </div>
                    {publicacion && publicacion.map((publicacionItem) => (
                        <div className="ImageModal-content-body-publication" key={publicacionItem.IdPublicacion}>
                            <div className="header_Perfil">
                                <Link to={`/Home/Perfil/${publicacionItem.IdPerfil}/${publicacionItem.urlPerfil}`}>
                                    <img src={publicacionItem.ImagenPerfil} />
                                </Link>
                                <div>
                                    <div className='Card-Articulo_header-nombre'>
                                        <Link to={`/Home/Perfil//${publicacionItem.IdPerfil}/${publicacionItem.urlPerfil}`}>
                                            <h3>{publicacionItem.NombrePerfil}</h3>
                                        </Link>
                                        <Level idlevel={publicacionItem.Level} />
                                    </div>
                                    <p>{format(new Date(publicacionItem.FechaPublicacion), "dd 'de' MMMM 'a las' HH:mm")}</p>
                                </div>
                            </div>
                            <div className="publicacion">
                                <h2>{publicacionItem.Titulo}</h2>
                                <p>{publicacionItem.Contenido}</p>
                            </div>
                            <div className="acciones">
                                <div>
                                    <Like idPublicacion={publicacionItem.IdPublicacion} idperfil={userState.IdPerfil} UserLikes={publicacionItem.UserLikes} />
                                    <p>Me gusta</p>
                                </div>
                                <div>
                                    <Link to={`/Home/Publicacion/${publicacionItem.IdPublicacion}/${encodeURIComponent(publicacionItem.Titulo.toLowerCase().replace(/ /g, '-'))}`}>
                                        <IonIcon className='acciones-icono' icon={eyeOutline} />
                                        Ver publicación
                                    </Link>
                                </div>
                            </div>
                            <div className="comentarios">
                                {publicacionItem.Comentarios.slice().reverse().map((comentario) => (
                                    <>
                                        <div key={comentario.IdComentarios} className='content_body-comentario divComentario'>
                                            {comentario.comentariosRespuesta.length != 0 && (
                                                <div className='hiloComentarios'></div>
                                            )}
                                            <div className='content_body-comentario_perfil '>
                                                <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                                    <img src={comentario.ImagenPerfilComentarios} alt="" />

                                                </Link>
                                                <div className='content_body-comentario_content'>
                                                    <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                                        <h3>{comentario.NombrePerfilComentarios}</h3>
                                                    </Link>
                                                    <p>{comentario.Comentario}</p>
                                                </div>
                                            </div>
                                            <div className='content_body-comentario-imagen'>
                                                {comentario?.imagenComentario != '' && (
                                                    <img src={comentario.imagenComentario} alt="" />
                                                )}
                                            </div>
                                            <div className="content_body-comentario_perfil_calificacion">
                                                <div>
                                                    <LikeComentarios
                                                        idPublicacion={imageUrls[currentImageIndex].idPublicacion}
                                                        idComentario={comentario.IdComentarios}
                                                        idRespuesta={0}
                                                        idperfil={userState.IdPerfil}
                                                        UserLikes={comentario.UserLikes}
                                                        tipo={1}
                                                    />
                                                    <p>{comentario.megustaComentarios} Me gustas</p>
                                                </div>

                                            </div>
                                        </div>
                                        {comentario.comentariosRespuesta.slice().reverse().map((respuesta, index) => (
                                            <div className='respuestaComentario' key={respuesta.IdResponse}>
                                                {index !== comentario.comentariosRespuesta.length - 1 && <div className='hiliRespuesta'></div>}
                                                <div key={respuesta.IdResponse} className='content_body-comentario-Response'>

                                                    <div className='content_body-comentario_perfil-Response'>
                                                        <Link to={`/Home/Perfil/${respuesta.IdPerfilComentarios}/${respuesta.urlPerfil}`}>

                                                            <img src={respuesta.ImagenPerfilComentarios} alt="" />
                                                        </Link>
                                                        <div className='content_body-comentario_content-Response'>
                                                            <Link to={`/Home/Perfil/${respuesta.IdPerfilComentarios}/${respuesta.urlPerfil}`}>
                                                                <h3>{respuesta.NombrePerfilComentarios}</h3>
                                                            </Link>
                                                            <p>{respuesta.Comentario}</p>
                                                        </div>

                                                    </div>
                                                    <div className="content_body-comentario_perfil_calificacion calificacion-response">
                                                        <div>
                                                            <LikeComentarios
                                                                idPublicacion={imageUrls[currentImageIndex].idPublicacion}
                                                                idComentario={respuesta.IdComentarios}
                                                                idRespuesta={respuesta.IdResponse}
                                                                idperfil={userState.IdPerfil}
                                                                UserLikes={respuesta.UserLikes}
                                                                tipo={2}
                                                            />
                                                            <p>{respuesta.megustaComentarios} Me gustas</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ModalImagenesDos;
