import { IonIcon } from '@ionic/react';
import { closeCircleOutline, paperPlaneOutline, happyOutline } from 'ionicons/icons';
import './PerfilContenido.css';
import { DiarioComentarios } from '../../../models';
import { Link } from 'react-router-dom';
import {useState } from 'react';
import { format } from 'date-fns';
import comentar from '../../../assets/imagenes/comentar.png';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { Emoticones } from '../../Emoticones';
import { useDiarioContext } from '../../../Context/DiarioContext';


interface Props {
    mostrarComentariosDiario: () => void;
    comentarios: DiarioComentarios[];
    idDiario: number;
}

const ComentariosDiario: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [comentarios, setComentarios] = useState<DiarioComentarios[]>(props.comentarios);
    const [textareaValue, setTextareaValue] = useState('');
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const { agregarComentarioDiario} = useDiarioContext();

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
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



    const handleaddComentarioDiario = () => {

        if (textareaValue == '') {
            alert('Ingrese un comentario');

        } else {
            const IdPerfilComentarios = parseInt(userState.IdPerfil.toString(), 10);
            const now = new Date();
            const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
            const nuevoComentario: DiarioComentarios = {
                idDiario: props.idDiario,
                idPerfilComentarios: IdPerfilComentarios,
                fechaComentario: formattedDate,
                nombrePerfilComentarios: userState.NombrePerfil,
                imagenPerfilComentarios: userState.ImagenPerfil,
                comentario: textareaValue,
                urlPerfil:userState.urlPerfil,
            };

            setComentarios([...comentarios, nuevoComentario]);
            agregarComentarioDiario(props.idDiario, nuevoComentario);
            setTextareaValue('');
        }
    };


    return (
        <div className="RegistrarDiario">
            <div className="RegistrarDiario-content">
                <div className='CardComentarios-content_header_cerrar'>
                    <IonIcon className='Icono-cerrar' onClick={props.mostrarComentariosDiario} icon={closeCircleOutline} />
                </div>
                <div className="Formulario-registroDiario">
                    <div className="Formulario-encabezado Diario-comentarios-encabezado">
                        <h3>Comentarios al diario</h3>
                    </div>
                    <div className="Diario-comentarios">
                        {comentarios.length === 0 && (
                            <div className='sincomentarios'>
                                <h3> ¡Tu opinión es valiosa! Sé el primero en compartir tus pensamientos sobre esta publicación. </h3>
                                <img src={comentar} alt="" />
                            </div>
                        )}
                        {comentarios.slice().reverse().map((comentario, index) => (
                            <div className="comentarios_Perfil" key={index}>
                                <Link to={`/Home/Perfil/${comentario.idPerfilComentarios}/${comentario.urlPerfil}`}>
                                    <img src={comentario.imagenPerfilComentarios} alt="Imagen de perfil" />
                                </Link>
                                <div>
                                    <Link to={`/Home/Perfil/${comentario.idPerfilComentarios}/${comentario.urlPerfil}`}>
                                        {comentario.nombrePerfilComentarios}
                                    </Link>
                                    <p>{comentario.comentario}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='Comentar'>
                    <div className='Comentar-perfil'>
                        <img src={userState.ImagenPerfil} alt="" />
                    </div>
                    <div className='Comentar-input'>
                        <textarea
                            name=""
                            placeholder='Escribe un comentario...'
                            className="auto-adjust-textarea"
                            value={textareaValue}
                            onChange={handleTextareaInput}
                        />
                        <div className='Card-Comentar-input-acciones'>
                            <div>
                                <IonIcon onClick={mostrarEmoticos} className='iconoComentar' icon={happyOutline} />
                            </div>
                            <div>
                                <IonIcon className='iconoEnviar' icon={paperPlaneOutline} onClick={handleaddComentarioDiario}/>
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
            </div>
        </div>
    );
}

export default ComentariosDiario;
