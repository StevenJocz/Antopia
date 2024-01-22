import React, { useEffect, useState } from "react";
import "./ModalImagenes.css";
import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chevronForwardCircleOutline, chevronBackCircleOutline, eyeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { Level } from "../Level";
import Like from "../Like/Like";
import { Comentario, Publicacion } from "../../models";
import { getPublicaciones } from "../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import LikeComentarios from "../Like/LikeComentarios";
import { usePublicaciones } from "../../Context/PublicacionesContext";

interface ImageModalProps {
  imageUrls: string[];
  idPublicacion: number;
  currentIndex: number;
  onClose: () => void;
}

const ModalImagenes: React.FC<ImageModalProps> = ({ imageUrls, currentIndex, onClose, idPublicacion }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const userState = useSelector((store: AppStore) => store.user);
  const [publicacion, setPublicacion] = useState<Publicacion[] | null>(null);
  const { listarComentariosDePublicacion } = usePublicaciones();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);



  useEffect(() => {
    async function fetchPerfil() {
      try {
        const resultado = await getPublicaciones(userState.IdPerfil, 6, idPublicacion, "0");
        setPublicacion(resultado);

      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    }
    fetchPerfil();
  }, [idPublicacion]);

  useEffect(() => {
    const cargarComentarios = async () => {
      try {
        // Llama a listarComentariosDePublicacion para obtener los comentarios de la publicación actual.
        const comentariosDePublicacion = await listarComentariosDePublicacion(idPublicacion);

        // Si se obtienen comentarios, actúaliza el estado con los comentarios.
        if (comentariosDePublicacion) {
          setComentarios(comentariosDePublicacion);
        }
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };

    cargarComentarios();
  }, [idPublicacion, listarComentariosDePublicacion]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };


  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };


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
                  onClick={goToPreviousImage}
                  icon={chevronBackCircleOutline}
                />
              </div>
            )}
            <div className="ImageModal-content-body-imagen-img">
              <img
                src={imageUrls[currentImageIndex]}
                alt=""
                className="ImageModal-image"
              />
            </div>
            {showArrows && (
              <div className="ImageModal-content-body-icono  ImageModal-content-body-icono-derecha">
                <IonIcon
                  className="Icono-flecha Icono-derecha"
                  onClick={goToNextImage}
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
                {comentarios.slice().reverse().map((comentario) => (
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
                            idPublicacion={idPublicacion}
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

                              <img src={respuesta.ImagenPerfilComentarios} alt="antopia" loading="lazy"/>
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
                                idPublicacion={idPublicacion}
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

export default ModalImagenes;
