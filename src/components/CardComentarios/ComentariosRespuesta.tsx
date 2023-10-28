import { IonIcon } from "@ionic/react"
import { closeCircleOutline, paperPlaneOutline, happyOutline } from 'ionicons/icons';
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { Link } from "react-router-dom";
import './CardComentarios.css'
import { Comentario } from "../../models";
import { usePublicaciones } from "../../Context/PublicacionesContext";
import { format } from "date-fns";
import { Emoticones } from "../Emoticones";

interface Props {
    mostrarRespuestaComentario: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
    idComentario: number;
    idPublicacion : number;
}

const ComentariosRespuesta: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [textareaValue, setTextareaValue] = useState('');
    const {agregarRespuestaAComentario } = usePublicaciones();
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');

    const mostrarEmoticos = () => {
        setVerEmoticos(!verEmoticos);
    };

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        setTextareaValue(textareaValue + emoji);
        console.log(selectedEmoji);
        setVerEmoticos(false);
    };

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaValue(textarea.value);
    };


    const handleaddRespuesta = () => {

        if (textareaValue == '') {
            alert('Ingrese un comentario');

        } else {
            const now = new Date();
            const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
            const IdPerfilComentarios = parseInt(userState.IdPerfil.toString(), 10);
            const nuevoRespuesta: Comentario = {
                IdComentarios: props.idComentario,
                IdResponse: 0,
                IdPerfilComentarios: IdPerfilComentarios,
                NombrePerfilComentarios: userState.NombrePerfil,
                ImagenPerfilComentarios: userState.ImagenPerfil,
                urlPerfil: userState.urlPerfil,
                Comentario: textareaValue,
                imagenComentario: '',
                FechaComentario: formattedDate,
                megustaComentarios: 0,
                UserLikes: 0,
                comentariosRespuesta: [],
            };

            agregarRespuestaAComentario(props.idPublicacion, props.idComentario, nuevoRespuesta);
            setTextareaValue('');
            props.mostrarRespuestaComentario();
        }
    };

    return (
        
        <div className="content_body-comentario-Response">
            <div className='content_body-comentario_perfil-Response'>
                <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`}>
                    <img src={userState.ImagenPerfil} alt="" />
                </Link>
                <div className='content_body-comentario_content-Response'>
                    <div className="content_body-comentario_content-Response_header">
                        <h3>{userState.NombrePerfil}</h3>
                        <IonIcon className='Icono-cerrar' onClick={props.mostrarRespuestaComentario} icon={closeCircleOutline} />
                    </div>
                    <textarea
                        name=""
                        placeholder='Escribe una respuesta...'
                        className="auto-adjust-textarea"
                        value={textareaValue}
                        onChange={handleTextareaInput}
                    />
                    <div className='content_body-comentario_content-acciones'>
                        <div>
                            <IonIcon onClick={mostrarEmoticos} className='iconoComentar' icon={happyOutline} />
                        </div>
                        <div>
                            <IonIcon className='iconoEnviar' icon={paperPlaneOutline} onClick={handleaddRespuesta} />
                        </div>
                    </div>
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

    )
}

export default ComentariosRespuesta