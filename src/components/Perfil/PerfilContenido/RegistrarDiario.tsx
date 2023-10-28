import React, { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, cameraOutline, happyOutline } from 'ionicons/icons';
import { useDiarioContext } from "../../../Context/DiarioContext";
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { Emoticones } from '../../Emoticones';


interface Props {
    mostrarRegistrarDiario: () => void;
    tipo: boolean;
    id: number;
}

const RegistrarDiario: React.FC<Props> = (props) => {
    const { agregarRegistro, agregarDiario } = useDiarioContext();
    const [nombreDiario, setNombreDiario] = useState("");
    const [fechaDiario, setFechaDiario] = useState("");
    const [contenidoDiario, setContenidoDiario] = useState('');
    const userState = useSelector((store: AppStore) => store.user);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');

    useEffect(() => {
        const contentBody = document.querySelector('.NuevoPost-Publicar-post') as HTMLElement;
        const comentarInput = document.querySelector('.Comentar-input') as HTMLElement;
        const input = document.querySelector('.auto-adjust') as HTMLTextAreaElement;

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
    }, [contenidoDiario]);

    const handleCameraIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        // Reemplaza los saltos de línea por '\n' y guarda el contenido
        setContenidoDiario(textarea.value);
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

    const handleTextareaDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

            if (imageFiles.length > 0) {
                const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
                setSelectedImages(prevImages => [...prevImages, ...imageUrls]);
            }
        }
    };

    const mostrarEmoticos = () => {
        setVerEmoticos(!verEmoticos);
    };

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        setContenidoDiario(contenidoDiario + emoji);
        console.log(selectedEmoji);
        setVerEmoticos(false);
    };

    const handleRegistrarDiarioSinRegistros = () => {
        if (nombreDiario === "") {
            alert("Debes ingresar un nombre para el diario");
            return;
        }

        const nuevoDiario = {
            idPerfil: userState.IdPerfil,
            id: 0,
            diario: nombreDiario,
            Megustas: 0,
            UserLikes: 0,
            comentarios: 0,
            registros: [],
            comentariosDiario: [],
        };

        agregarDiario({ ...nuevoDiario });
        props.mostrarRegistrarDiario();
    };

    const handleRegistrarDia = () => {
        if (fechaDiario === "") {
            alert("Debes seleccionar una fecha");
            return;
        }
        if (contenidoDiario === "") {
            alert("Debes ingresar un contenido");
            return;
        }

        const nuevoRegistro = {
            idRegistro: 0,
            idDiary: props.id,
            fecha: fechaDiario,
            contenido: contenidoDiario,
            imagen: selectedImages,
            base64: base64Images,
        };

        agregarRegistro(props.id, { ...nuevoRegistro });
        props.mostrarRegistrarDiario();
    };

    return (
        <div className="RegistrarDiario">
            <div className="RegistrarDiario-content">
                <div className='CardComentarios-content_header_cerrar'>
                    <IonIcon className='Icono-cerrar' onClick={props.mostrarRegistrarDiario} icon={closeCircleOutline} />
                </div>
                <div>
                    {props.tipo ?
                        <div className="Formulario-registroDiario">
                            <div className="Formulario-encabezado">
                                <h3>Registrar Diario</h3>
                                <p>Aqui podras registrar tu diario</p>
                            </div>
                            <div className="Formulario-content">
                                <label>Nombre del diario</label>
                                <input
                                    type="text"
                                    placeholder="Escribe el nombre que le quieres dar al diario"
                                    value={nombreDiario}
                                    onChange={(e) => setNombreDiario(e.target.value)}
                                />
                            </div>
                            <div className="Formulario-footer">
                                <button onClick={handleRegistrarDiarioSinRegistros}>Registrar</button>
                            </div>
                        </div>
                        :
                        <div className="Formulario-registroDiario">
                            <div className="Formulario-encabezado">
                                <h3>Registrar el día de tu diario</h3>
                                <p>Aqui podras registrar el día a día de tus colonias</p>
                            </div>

                            <div className='Formulario-registroDiario '>
                                <label>Fecha</label>
                                <input
                                    type="Date"
                                    placeholder="Seleccione la fecha"
                                    value={fechaDiario}
                                    onChange={(e) => setFechaDiario(e.target.value)}
                                />
                            </div>

                            <div className="NuevoPost-Publicar-post-Publicacion">
                                <div className="NuevoPost-Publicar-post-Publicacion-textarea">
                                    <textarea
                                        placeholder="Que paso hoy?"
                                        value={contenidoDiario}
                                        className="auto-adjust"
                                        onDrop={handleTextareaDrop}
                                        onChange={handleTextareaInput}
                                    />
                                </div>
                                <div className='Comentar-vista-imagenes'>
                                    {selectedImages.map((imageUrl, index) => (
                                        <div key={index} className='Comentar-vista-imagenes-content'>
                                            <img src={imageUrl} alt={`Preview ${index}`} />
                                            <IonIcon
                                                className='Icono-cerrar'
                                                onClick={() => handleRemoveImage(index)}
                                                icon={closeCircleOutline}
                                            />
                                        </div>
                                    ))}

                                </div>
                                <div className='Comentar-input-acciones'>
                                    <div>
                                        <IonIcon onClick={mostrarEmoticos} className='iconos' icon={happyOutline} />
                                        <IonIcon className='iconos' icon={cameraOutline} onClick={handleCameraIconClick} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={inputRef}
                                            multiple
                                            onChange={handleImageInputChange}
                                        />
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

                            <div className="Formulario-footer">
                                <button onClick={handleRegistrarDia}>Registrar</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RegistrarDiario;
