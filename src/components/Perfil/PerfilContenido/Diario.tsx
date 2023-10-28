import React, { useEffect, useState } from 'react';
import { useDiarioContext } from '../../../Context/DiarioContext';
import { format } from 'date-fns';
import RegistrarDiario from './RegistrarDiario';
import { AppStore } from '../../../redux/store';
import { useSelector } from "react-redux";
import { IonIcon } from '@ionic/react';
import { chatbubbleOutline } from 'ionicons/icons';
import './PerfilContenido.css';
import LikeDiary from '../../Like/LikeDiary';
import ComentariosDiario from './ComentariosDiario';

interface Props {
    idPerfil: number;
}

const Diario: React.FC<Props> = (props) => {
    const [verRegistrarDiario, setRegistrarDiario] = useState(false);
    const [tipo, setTipo] = useState(false);
    const { diarioData } = useDiarioContext();
    const [mostrarReDiario, setMostrarReDiario] = useState(false);
    const [mostrarComentariosDiario, setMostrarComentariosDiario] = useState(false);
    const userState = useSelector((store: AppStore) => store.user);

    const [selectedDiarioId, setSelectedDiarioId] = useState<number>(1);

    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 550;
        }
    }, []);


    const mostrarRegistrarDiario = (tipo: boolean) => {
        setRegistrarDiario(true);
        setTipo(tipo);
    };

    const mostrarRegistrosDiario = (id: number) => {
        setSelectedDiarioId(id);
    };


    const handdlemostrarComentariosDiario = () => {
        setMostrarComentariosDiario(true);
    };


    useEffect(() => {
        if (props.idPerfil == userState.IdPerfil) {
            setMostrarReDiario(true);
        } else {
            setMostrarReDiario(false);
        }

    }, [props.idPerfil, userState.IdPerfil]);

    const calculateGridColumns = (imagenCount: number) => {
        return imagenCount === 1 ? '2fr' : 'repeat(2, 3fr)';
    };

    return (
        <div className='Diario' id='Diario'>
            <div className='Diario-nav'>
                <ul>
                    {mostrarReDiario && (
                        <li className='li-Registrar-Diario' onClick={() => mostrarRegistrarDiario(true)}>+ Nuevo diario</li>
                    )}
                    {diarioData.map((diario, index) => (
                        <li key={index} onClick={() => mostrarRegistrosDiario(diario.id)}>{diario.diario}</li>
                    ))}
                </ul>
            </div>
            <div className='Diario-content'>
                {selectedDiarioId !== null && (
                    <div>
                        {diarioData
                            .filter(diario => diario.id === selectedDiarioId)
                            .map(selectedDiario => (
                                <div key={selectedDiario.id}>
                                    <h2>{selectedDiario.diario}</h2>
                                    <div className='Diario-content-boton'>
                                        <ul>
                                            {/* <li> <IonIcon className='Diario-content-boton-icono iconoMeGusta' icon={heart}/>100 </li> */}
                                            <li> <LikeDiary idDiary={selectedDiario.id} idperfil={userState.IdPerfil} UserLikes={selectedDiario.UserLikes} />{selectedDiario.Megustas} </li>
                                            <li onClick={handdlemostrarComentariosDiario}><IonIcon className='Diario-content-boton-icono iconoComentar' icon={chatbubbleOutline} />{selectedDiario.comentarios}</li>
                                            {mostrarReDiario && (
                                                <li className='Agregar-Registro' onClick={() => mostrarRegistrarDiario(false)}>¿Qué pasa en el mundo de tus hormigas hoy?</li>
                                            )}
                                        </ul>
                                    </div>
                                    {mostrarComentariosDiario && (
                                        <ComentariosDiario mostrarComentariosDiario={() => setMostrarComentariosDiario(false)} comentarios={selectedDiario.comentariosDiario} idDiario={selectedDiario.id}/>
                                    )}
                                </div>
                            ))}
                        {diarioData
                            .find(diario => diario.id === selectedDiarioId)
                            ?.registros
                            .slice()
                            .reverse()
                            .map((registro, registroIndex, registros) => (
                                <div className='Diario-content-publicado' key={registroIndex}>
                                    <h3>{`Día ${registros.length - registroIndex}: ${format(new Date(registro.fecha), 'd \'de\' MMMM, yyyy')}`}</h3>
                                    {registro.contenido.split('\n').map((line, index) => (
                                        <p className="Diario-content-p" key={index}>{line}</p>
                                    ))}
                                    {registro.imagen.length > 0 && (
                                        <div className="Diario-content-publicado-imagenes"
                                            style={{ gridTemplateColumns: calculateGridColumns(registro.imagen.length) }}
                                        >
                                            {registro.imagen.slice(0, 2).map((imagen, imgIndex) => (
                                                <img key={imgIndex} src={imagen} alt={`Imagen ${imgIndex + 1}`} className={`imagen-${imgIndex + 1}`} />
                                            ))}
                                            {registro.imagen.length > 2 && (
                                                <div className="ExtraImagesInfo" >
                                                    <p>+{registro.imagen.length - 2} </p>
                                                    <img src={registro.imagen[2]} alt={`Imagen 5`} className={`imagen-5`} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {verRegistrarDiario && (
                <RegistrarDiario mostrarRegistrarDiario={() => setRegistrarDiario(false)} tipo={tipo} id={selectedDiarioId} />
            )}
        </div>
    );
};

export default Diario;
