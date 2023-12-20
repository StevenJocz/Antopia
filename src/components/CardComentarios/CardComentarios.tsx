import { useEffect } from 'react';
import './CardComentarios.css'
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, happyOutline, chatbubbleOutline, cameraOutline, paperPlaneOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Emoticones } from '../Emoticones';
import { format } from 'date-fns';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { Comentario } from '../../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Link } from 'react-router-dom';
import comentar from '../../assets/imagenes/comentar.png';
import LikeComentarios from '../Like/LikeComentarios';
import ComentariosRespuesta from './ComentariosRespuesta';

interface Props {
    idPublicacion: number;
}

const CardComentarios: React.FC<Props> = (props) => {

    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { agregarComentarioAPublicacion, listarComentariosDePublicacion } = usePublicaciones();
    const userState = useSelector((store: AppStore) => store.user);
    const [imagen, setImage] = useState('');
    const [verAgregarRespuesta, setVerAgregarRespuesta] = useState(false);
    const [idComentario, setIdComentario] = useState(0);
    const respuestaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const cargarComentarios = async () => {
            try {
                // Llama a listarComentariosDePublicacion para obtener los comentarios de la publicación actual.
                const comentariosDePublicacion = await listarComentariosDePublicacion(props.idPublicacion);

                // Si se obtienen comentarios, actúaliza el estado con los comentarios.
                if (comentariosDePublicacion) {
                    setComentarios(comentariosDePublicacion);
                }
            } catch (error) {
                console.error('Error al cargar comentarios:', error);
            }
        };

        cargarComentarios();
    }, [props.idPublicacion, listarComentariosDePublicacion]);

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight - 5}px`;
        setTextareaValue(textarea.value);
    };

    const mostrarEmoticos = () => {
        setVerEmoticos(!verEmoticos);
    };

    const handleVerAgregarRespuesta = (idComentario: number) => {
        if (idComentario !== idComentario) {
            setVerAgregarRespuesta(false);
        } else {
            setVerAgregarRespuesta(true);
            setIdComentario(idComentario);

            // Hacer scroll al elemento ComentariosRespuesta
            if (respuestaRef.current) {
                respuestaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        setTextareaValue(textareaValue + emoji);
        console.log(selectedEmoji);
        setVerEmoticos(false);
    };


    const handleCameraIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setSelectedImage(imageUrl);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string;
                    setImage(base64Image);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };



    const handleaddComentario = () => {

        if (textareaValue == '') {
            alert('Ingrese un comentario');

        } else {
            const now = new Date();
            const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
            const IdPerfilComentarios = parseInt(userState.IdPerfil.toString(), 10);
            const nuevoComentario: Comentario = {
                IdComentarios: 0,
                IdResponse: 0,
                IdPerfilComentarios: IdPerfilComentarios,
                NombrePerfilComentarios: userState.NombrePerfil,
                ImagenPerfilComentarios: userState.ImagenPerfil,
                urlPerfil: userState.urlPerfil,
                Comentario: textareaValue,
                imagenComentario: imagen,
                FechaComentario: formattedDate,
                megustaComentarios: 0,
                UserLikes: 0,
                comentariosRespuesta: [],
            };

            setComentarios([...comentarios, nuevoComentario]);
            agregarComentarioAPublicacion(props.idPublicacion, nuevoComentario)
            setSelectedImage('');
            setTextareaValue('');
        }
    };

    return (
        <div className='CardComentarios'>
            <h4>Comentarios</h4>
            <div className='Comentar'>
                <div className='Comentar-input'>
                    <div className='Comentar-perfil'>
                        <img src={userState.ImagenPerfil} alt="" />
                    </div>
                    <div className='Comentar-input-content'>
                        <textarea
                            name=""
                            placeholder='Escribe un comentario...'
                            value={textareaValue}
                            onChange={handleTextareaInput}
                            id="miTextarea"
                            className="auto-adjust-textarea"
                        />
                        <div className='Card-Comentar-input-acciones'>
                            <div>
                                <IonIcon onClick={mostrarEmoticos} className='iconoComentar' icon={happyOutline} />
                                <IonIcon className='iconoImagen' icon={cameraOutline} onClick={handleCameraIconClick} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                    onChange={handleImageInputChange}
                                />
                            </div>
                            <div>
                                <IonIcon className='iconoEnviar' icon={paperPlaneOutline} onClick={handleaddComentario} />
                            </div>
                        </div>

                        {selectedImage && (
                            <div className='Comentar-input-preview'>
                                <img src={selectedImage} alt="Preview" />
                                <IonIcon className='Icono-cerrar' onClick={handleRemoveImage} icon={closeCircleOutline} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='CardComentarios-content_body'>
                {comentarios.length === 0 && (
                    <div className='sincomentarios'>
                        <h3> ¡Tu opinión es valiosa! Sé el primero en compartir tus pensamientos sobre esta publicación. </h3>
                        <img src={comentar} alt="" />
                    </div>

                )}
                {comentarios.slice().reverse().map((comentario) => (
                    <>
                        <div key={comentario.IdComentarios} className='content_body-comentario divComentario'>
                            {comentario.comentariosRespuesta.length != 0 && (
                                <div className='hiloComentarios'></div>
                            )}
                            {(verAgregarRespuesta && idComentario === comentario.IdComentarios) && (
                                <div className='hiloComentarios'></div>
                            )}
                            <div className='content_body-comentario_perfil '>
                                <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                    <img src={comentario.ImagenPerfilComentarios} alt="" />

                                </Link>
                                <div className='content_body-comentario_content'>
                                    <div>
                                        <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                            <h3>{comentario.NombrePerfilComentarios}</h3>
                                        </Link>
                                        <span className='fechaComentario'>{format(new Date(comentario.FechaComentario), "dd 'de' MMMM 'a las' HH:mm")}</span>
                                    </div>

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
                                        idPublicacion={props.idPublicacion}
                                        idComentario={comentario.IdComentarios}
                                        idRespuesta={0}
                                        idperfil={userState.IdPerfil}
                                        UserLikes={comentario.UserLikes}
                                        tipo={1}
                                    />
                                    <p>{comentario.megustaComentarios}<span className='LetraMegusta'>Me gustas</span> </p>
                                    <div className='boton-responder' onClick={() => handleVerAgregarRespuesta(comentario.IdComentarios)}>
                                        <IonIcon className='iconoPlus icono' icon={chatbubbleOutline} />
                                        <p> Responder</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {verAgregarRespuesta && idComentario == comentario.IdComentarios && (
                            <div className='respuestaComentario'>
                                {comentario.comentariosRespuesta.length !== 0 && <div className='hiliRespuesta'></div>}
                                <ComentariosRespuesta
                                    ref={respuestaRef}
                                    mostrarRespuestaComentario={() => setVerAgregarRespuesta(false)}
                                    idComentario={idComentario}
                                    idPublicacion={props.idPublicacion}
                                />
                            </div>
                        )}
                        {comentario.comentariosRespuesta.slice().reverse().map((respuesta, index) => (
                            <div className='respuestaComentario' key={respuesta.IdResponse}>
                                {index !== comentario.comentariosRespuesta.length - 1 && <div className='hiliRespuesta'></div>}
                                <div key={respuesta.IdResponse} className='content_body-comentario-Response'>

                                    <div className='content_body-comentario_perfil-Response'>
                                        <Link to={`/Home/Perfil/${respuesta.IdPerfilComentarios}/${respuesta.urlPerfil}`}>

                                            <img src={respuesta.ImagenPerfilComentarios} alt="" />
                                        </Link>
                                        <div className='content_body-comentario_content-Response'>
                                            <div>
                                                <Link to={`/Home/Perfil/${respuesta.IdPerfilComentarios}/${respuesta.urlPerfil}`}>
                                                    <h3>{respuesta.NombrePerfilComentarios}</h3>
                                                </Link>
                                                <span className='fechaComentario'>{format(new Date(respuesta.FechaComentario), "dd 'de' MMMM 'a las' HH:mm")}</span>
                                            </div>
                                            <p>{respuesta.Comentario}</p>
                                        </div>

                                    </div>
                                    <div className="content_body-comentario_perfil_calificacion calificacion-response">
                                        <div>
                                            <LikeComentarios
                                                idPublicacion={props.idPublicacion}
                                                idComentario={respuesta.IdComentarios}
                                                idRespuesta={respuesta.IdResponse}
                                                idperfil={userState.IdPerfil}
                                                UserLikes={respuesta.UserLikes}
                                                tipo={2}
                                            />
                                            <p>{respuesta.megustaComentarios}<span className='LetraMegusta'>Me gustas</span></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </>
                ))}

            </div>
            <div className='Emoticones-content'>
                {verEmoticos && (
                    <Emoticones
                        mostrarEmoticos={() => setVerEmoticos(!verEmoticos)}
                        onEmojiSelect={handleEmojiSelect}
                    />
                )}
            </div>

        </div>
    )
}

export default CardComentarios