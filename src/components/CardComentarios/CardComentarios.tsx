import { useEffect } from 'react';
import './CardComentarios.css'
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, happyOutline, addCircleOutline, heart, cameraOutline, paperPlaneOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Emoticones } from '../Emoticones';
import { format } from 'date-fns';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { Comentario } from '../../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Link } from 'react-router-dom';
import comentar from '../../assets/imagenes/comentar.png';


interface Props {
    mostrarComentarios: () => void;
    idPublicacion: number;
    comentarios: Comentario[];
}

const CardComentarios: React.FC<Props> = (props) => {
    const [comentarios, setComentarios] = useState<Comentario[]>(props.comentarios);
    const [textareaValue, setTextareaValue] = useState('');
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { agregarComentarioAPublicacion } = usePublicaciones();
    const userState = useSelector((store: AppStore) => store.user);
    const [imagen, setImage] = useState('');


    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaValue(textarea.value);
    };

    const mostrarEmoticos = () => {
        setVerEmoticos(!verEmoticos);
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

    useEffect(() => {
        const contentBody = document.querySelector('.CardComentarios-content_body') as HTMLElement;
        const comentarInput = document.querySelector('.Comentar-input') as HTMLElement;
        const input = document.querySelector('.auto-adjust-textarea') as HTMLTextAreaElement;

        const updateContentBodyHeight = () => {
            if (contentBody && comentarInput && input) {
                const inputHeight = comentarInput.clientHeight;
                contentBody.style.height = `calc(67vh - ${inputHeight}px)`;
            }
        };

        updateContentBodyHeight();

        window.addEventListener('resize', updateContentBodyHeight);

        return () => {
            window.removeEventListener('resize', updateContentBodyHeight);
        };
    }, [textareaValue, selectedImage]);

    const handleTextareaKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleaddComentario();
        }
    };

    const handleaddComentario = () => {

        if (textareaValue == '') {
            alert('Ingrese un comentario');

        } else {
            const now = new Date();
            const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
            const IdPerfilComentarios = parseInt( userState.IdPerfil.toString(), 10);
            const nuevoComentario: Comentario = {
                IdPerfilComentarios: IdPerfilComentarios,
                NombrePerfilComentarios: userState.NombrePerfil,
                ImagenPerfilComentarios: userState.ImagenPerfil,
                urlPerfil: userState.urlPerfil,
                Comentario: textareaValue,
                imagenComentario: imagen,
                FechaComentario: formattedDate,
                megustaComentarios: 0,
            };

            setComentarios([...comentarios, nuevoComentario]);
            agregarComentarioAPublicacion(props.idPublicacion, nuevoComentario)
            setSelectedImage('');
            setTextareaValue('');
        }
    };

    return (
        <div className='CardComentarios'>
            <div className='CardComentarios-content'>
                <div className='CardComentarios-content_header'>
                    <h2>Comentarios</h2>
                    <div className='CardComentarios-content_header_cerrar'>
                        <IonIcon className='Icono-cerrar' onClick={props.mostrarComentarios} icon={closeCircleOutline} />
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
                            <div key={comentario.IdPerfilComentarios} className='content_body-comentario'>
                                <div className='content_body-comentario_perfil'>
                                    <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                        <img src={comentario.ImagenPerfilComentarios} alt="" />
                                    </Link>
                                    <div>
                                        <Link to={`/Home/Perfil/${comentario.IdPerfilComentarios}/${comentario.urlPerfil}`}>
                                            <h3>{comentario.NombrePerfilComentarios}</h3>
                                        </Link>
                                        <p>{format(new Date(comentario.FechaComentario), "d 'de' MMMM 'a las' HH:mm")}</p>
                                    </div>
                                    <div className="content_body-comentario_perfil_calificacion">
                                        <IonIcon className='iconoMeGusta' icon={heart} />
                                        <p>{comentario.megustaComentarios} me gustas</p>
                                        <IonIcon className='iconoPlus' icon={addCircleOutline} />
                                    </div>
                                </div>
                                <div className='content_body-comentario_comentar'>
                                    <p>{comentario.Comentario}</p>
    
                                    {comentario?.imagenComentario != ''  && (
                                        <img src={comentario.imagenComentario} alt="" />
                                    )}
                                </div>
                            </div>
                        ))}
                    
                </div>
                <div className='Comentar'>
                    <div className='Comentar-perfil'>
                        <img src={userState.ImagenPerfil} alt="" />
                    </div>
                    <div className='Comentar-input'>
                        <textarea
                            name=""
                            placeholder='Escribe un comentario...'
                            value={textareaValue}
                            onChange={handleTextareaInput}
                            onKeyPress={handleTextareaKeyPress}
                            id="miTextarea"
                            className="auto-adjust-textarea"
                        />
                        <div className='Comentar-input-acciones'>
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
                <div className='Emoticones-content'>
                    {verEmoticos && (
                        <Emoticones
                            mostrarEmoticos={() => setVerEmoticos(!verEmoticos)}
                            onEmojiSelect={handleEmojiSelect}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}

export default CardComentarios