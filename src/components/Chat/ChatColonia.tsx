import { IonIcon } from '@ionic/react';
import {
    arrowBack, paperPlaneOutline, happyOutline, attachOutline,  // documentAttachOutline,
    checkmarkDoneOutline, imageOutline, closeCircleOutline //,documentOutline
} from 'ionicons/icons';
import './Chat.css'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Colonia, chat, services } from '../../models';
import { getMiColonia } from '../../services';
import io from 'socket.io-client';
import { format } from 'date-fns';

interface Props {
    idColonia: number;
    handleVerColonia: (idColonia: number) => void;
    handleVerPerviaChat: () => void;
}

const ChatColonia: React.FC<Props> = (props) => {
    const [verArchivo, setVerArchivo] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const [respuestaChatView, setRespuestaChatView,] = useState([] as chat[]);
    const userState = useSelector((store: AppStore) => store.user);
    const [colonia, setColonia] = useState<Colonia | null>(null);
    const [mensaje, setMensaje] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const inputRefImagens = useRef<HTMLInputElement | null>(null);
    const baseUrl = services.socket
    const socket = io(baseUrl);

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = '10px';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setMensaje(textarea.value);
    };

    const handleVerArchivo = () => {
        setVerArchivo(!verArchivo);
    };

    const fetchPerfil = async () => {
        try {
            const fetchedPerfiles = await getMiColonia(Number(props.idColonia), userState.IdPerfil);;
            setColonia(fetchedPerfiles.length > 0 ? fetchedPerfiles[0] : null);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    };

    const handleReceiveMessage = (msg: chat) => {
        console.log(msg)
        setRespuestaChatView((prevRespuestaChat) => [...prevRespuestaChat, msg]);
        setTimeout(() => {
            if (chatBodyRef.current) {
                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            }
        }, 200);

    };

    useEffect(() => {
        const fetchProfileIfNeeded = async () => {
            if (props.idColonia) {
                await fetchPerfil();
            } else {
                setColonia(null);
            }
        };

        const initializeChat = async () => {
            await fetchProfileIfNeeded();

            if (userState.IdPerfil) {
                socket.emit('user_connected', userState.IdPerfil);
                socket.emit('mensajesColonia', props.idColonia);
                socket.on('mensajes_colonia', (data) => {
                    setRespuestaChatView(data);
                });

                socket.on('EmitirMensaje', handleReceiveMessage);

                setTimeout(() => {
                    if (chatBodyRef.current) {
                        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                    }
                }, 400);
            }
        };

        initializeChat();

    }, [userState.IdPerfil]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleEnviarMensaje();
        }
    };

    const handleEnviarMensaje = async () => {
        try {
            if (mensaje === '' && base64Images.length === 0) {
                return;
            }

            const msg: chat = {
                id: 0,
                de: userState.IdPerfil,
                para: 0,
                message: mensaje,
                id_Grupo: props.idColonia,
                general: 0,
                fecha: new Date().toString(),
                hora: new Date().toString(),
                imagenes: base64Images.map((base64String) => ({ img: base64String })),
                leido: false
            }

            socket.emit('EnviarMensaje', msg);

            setMensaje('');
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.focus();
            }
            setSelectedImages([]);
            setBase64Images([]);
            setVerArchivo(false);

        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    const handleImageInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const imagePromises = Array.from(files).map(async (file) => {
                return new Promise<{ url: string, base64: string }>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target) {
                            const base64 = e.target.result as string;
                            const url = URL.createObjectURL(file);
                            resolve({ url, base64 });
                        }
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(file);
                });
            });

            try {
                const results = await Promise.all(imagePromises);
                const imageUrls = results.map(result => result.url);
                const base64ImagesArray = results.map(result => result.base64);

                setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
                setBase64Images((prevBase64Images) => [...prevBase64Images, ...base64ImagesArray]);


            } catch (error) {
                console.error('Error al convertir imágenes a base64:', error);
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleCameraIconClick = () => {
        if (inputRefImagens.current) {
            inputRefImagens.current.click();
        }
    };


    const mensajesAgrupados: { [fecha: string]: chat[] } = respuestaChatView.reduce((agrupado: { [fecha: string]: chat[] }, chatItem: chat) => {
        if (chatItem.id_Grupo == props.idColonia) {
            if (!agrupado[chatItem.fecha]) {
                agrupado[chatItem.fecha] = [];
            }
            agrupado[chatItem.fecha].push(chatItem);
        }
        return agrupado;
    }, {});

    return (
        <div className='ChatView'>
            <div className='ChatView_header'>
                <div className='ChatView_header-volver'>
                    <IonIcon className='volver-icono flechaVolver' icon={arrowBack} onClick={() => props.handleVerColonia(0)} />
                </div>
                <div className='ChatView_header-perfil'>

                    <div className='ChatView_header-perfil-info'>
                        <img src={colonia?.s_photo} alt="" />
                        <div>
                            <h2>{colonia?.s_name}</h2>
                        </div>
                    </div>
                    <div className='Chat-center-cerrar'>
                        <IonIcon className='icoo' icon={closeCircleOutline} onClick={() => props.handleVerPerviaChat()} />
                    </div>
                </div>
            </div>
            <div className='ChatView_body' ref={chatBodyRef}>
                {Object.entries(mensajesAgrupados).map(([fecha, mensajes], index) => (
                    <>
                        {fecha.length === 0 ? (
                            <p key={index} className='sinResultado'>No haz iniciado una conversión con este usuario</p>
                        ) : (
                            <div key={index}>
                                <div className='ChatView_body-fecha' >
                                    <p>{format(new Date(fecha), "dd 'de' MMMM")}</p>
                                    {/* <p>{fecha}</p> */}

                                </div>
                                <div className='ChatView_mensajes-por-fecha' >

                                    {mensajes.map((mensaje, idx) => (
                                        <div key={idx}>
                                            {userState.IdPerfil == mensaje.de ? (
                                                <div className='ChatView_body-enviado'>
                                                    <div className='ChatView_body-enviado-content'>
                                                        {mensaje.imagenes.length > 0 && (
                                                            <div className='ChatView_body-enviado-images'>
                                                                {mensaje.imagenes.slice(0, 2).map((imagen, imgIndex) => (
                                                                    <img key={imgIndex} src={`${baseUrl}/Imagenes/${imagen.img}`} alt='' />
                                                                ))}
                                                                {mensaje.imagenes.length > 2 && (
                                                                    <div className="ChatView-Extra">
                                                                        <p>+{mensaje.imagenes.length - 2} </p>
                                                                        <img
                                                                            src={`${baseUrl}/Imagenes/${mensaje.imagenes[2].img}`}
                                                                            alt=""
                                                                            className=""
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        <p>{mensaje.message}</p>
                                                        <p className='Hora-enviado'>{mensaje.hora}<i className={mensaje.leido == true ? "enviado-active" : ''}><IonIcon className='' icon={checkmarkDoneOutline} /> </i></p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='ChatView_body-resivido'>
                                                    <img src={mensaje.foto_usuario} alt="" />
                                                    <div className='ChatView_body-resivido-content'>
                                                        <h4>{mensaje.usuario}</h4>
                                                        {mensaje.imagenes.length > 0 && (
                                                            <div className='ChatView_body-resivido-images'>
                                                                {mensaje.imagenes.slice(0, 2).map((imagen, imgIndex) => (
                                                                    <img key={imgIndex} src={`${baseUrl}/Imagenes/${imagen.img}`} alt='' />
                                                                ))}
                                                                {mensaje.imagenes.length > 2 && (
                                                                    <div className="ChatView-Extra">
                                                                        <p>+{mensaje.imagenes.length - 2} </p>
                                                                        <img
                                                                            src={`${baseUrl}/Imagenes/${mensaje.imagenes[2].img}`}
                                                                            alt=""
                                                                            className=""
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        <p>{mensaje.message}</p>
                                                        <p className='Hora-enviado'>{mensaje.hora} </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                    }

                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
            <div className='ChatView_footer'>
                {verArchivo && (
                    <div className='ChatView_footer-archivos'>
                        <div className='ChatView_footer-archivos-content'>
                            <div>
                                <IonIcon className='archivos-icono icono-imagen' icon={imageOutline} onClick={handleCameraIconClick} />
                                {/* <IonIcon className='archivos-icono icono-archivo' icon={documentOutline} /> */}
                            </div>
                            <IonIcon className='archivos-icono close-icono' icon={closeCircleOutline} onClick={handleVerArchivo} />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={inputRefImagens}
                                multiple
                                onChange={handleImageInputChange}
                            />
                        </div>
                        <div className='ChatView_footer-vista-imagenes'>
                            {/* <span><IonIcon className='' icon={documentAttachOutline} />Nombre archivo</span> */}

                            {selectedImages.map((imageUrl, index) => (
                                <div key={index} className='ChatView_footer-vista-imagenes-content'>
                                    <img src={imageUrl} alt={`Preview ${index}`} />
                                    <IonIcon
                                        className='Icono-cerrar'
                                        onClick={() => handleRemoveImage(index)}
                                        icon={closeCircleOutline}
                                    />
                                </div>
                            ))}

                        </div>


                    </div>
                )}

                <div className='ChatView_footer-content'>
                    <div>
                        <IonIcon className='iconos-chat' icon={happyOutline} />
                        <IonIcon className='iconos-chat' icon={attachOutline} onClick={handleVerArchivo} />
                    </div>
                    <textarea
                        name=""
                        placeholder='Mensaje'
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        onChange={handleTextareaInput}
                    >

                    </textarea>
                    <div>

                        <IonIcon className='iconos-chat iconoEnviar' icon={paperPlaneOutline} onClick={() => handleEnviarMensaje()} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatColonia