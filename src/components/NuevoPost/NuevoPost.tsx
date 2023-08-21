import { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, happyOutline, cameraOutline } from 'ionicons/icons';
import './NuevoPost.css'
import { Emoticones } from '../Emoticones';
import { Link } from 'react-router-dom';
import { Publicacion } from '../../models';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';


const NuevoPost = () => {
    const [verPublicar, setVerPublicar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedImageNames, setSelectedImageNames] = useState<string[]>([]);
    const userState = useSelector((store: AppStore) => store.user);
    

    const mostrarPublicar = () => {
        setVerPublicar(!verPublicar);
    };

    const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = '200px';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaValue(textarea.value);
    };

    const mostrarEmoticos = () => {
        setVerEmoticos(!verEmoticos);
    };

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        setInputValue(input.value);
    }


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

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setSelectedImages(prevImages => [...prevImages, ...imageUrls]);

            // Extract file names and update selectedImageNames
            const imageNames = Array.from(files).map(file => file.name);
            setSelectedImageNames(prevNames => [...prevNames, ...imageNames]);
            setYoutubeThumbnail('');
        }
    };

    useEffect(() => {
        const contentBody = document.querySelector('.NuevoPost-Publicar-post') as HTMLElement;
        const comentarInput = document.querySelector('.Comentar-input') as HTMLElement;
        const input = document.querySelector('.auto-adjust') as HTMLTextAreaElement;

        const updateContentBodyHeight = () => {
            if (contentBody && comentarInput && input) {
                const inputHeight = comentarInput.clientHeight;
                contentBody.style.height = `calc(100vh - ${inputHeight}px)`;
            }
        };

        updateContentBodyHeight();

        window.addEventListener('resize', updateContentBodyHeight);

        return () => {
            window.removeEventListener('resize', updateContentBodyHeight);
        };
    }, [textareaValue, selectedImages]);

    const handleTextareaDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

            if (imageFiles.length > 0) {
                const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
                setSelectedImages(prevImages => [...prevImages, ...imageUrls]);
                setYoutubeThumbnail('');
            }
        }
    };

    const [youtubeThumbnail, setYoutubeThumbnail] = useState<string | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState<string | null>('');



    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData.getData('text');
    
        const youtubeMatch = pastedText.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/|youtu\.be\/|\/)?([a-zA-Z0-9\-_]+)/);
    
        if (youtubeMatch) {
            event.preventDefault();
            setYoutubeUrl(pastedText);
    
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    
            setYoutubeThumbnail(thumbnailUrl);
            setSelectedImages([]);
        }
    };
    


    const handleRemovePaste = () => {
        setYoutubeThumbnail('');
    };

    const { agregarPublicacion } = usePublicaciones();
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");

    const nuevaPublicacion: Publicacion = {

        IdPerfil: userState.IdPerfil,
        NombrePerfil: userState.NombrePerfil,
        ImagenPerfil: userState.ImagenPerfil,
        urlPerfil: 'alho',
        IdPublicacion: 999,
        IdTipo: 0,
        Megustas: 0,
        CantidadComentarios: 0,
        FechaPublicacion: formattedDate,
        Titulo: inputValue,
        Contenido: textareaValue,
        UrlYoutube: youtubeUrl || '',
        ImagenesPublicacion: {
            
        },
        Comentarios: [],
    };

    const handleAddPublicacion = () => {

        if (inputValue == '') {
            alert('Ingrese un titulo');
        } else if (textareaValue == '') {
            alert('Ingrese un contenido');
        } else {
            
            const imagenesPublicacion: { [key: string]: string } = {};

            selectedImageNames.forEach((imageName, index) => {
                imagenesPublicacion[`imagen${index + 1}`] = imageName;
                
            });

            console.log(imagenesPublicacion);

            agregarPublicacion({
                ...nuevaPublicacion,
                ImagenesPublicacion: imagenesPublicacion,
            });
            agregarPublicacion(nuevaPublicacion);
            setYoutubeThumbnail('');
            setYoutubeUrl('');
            setInputValue('');
            setTextareaValue('');
            setSelectedImages([]);
            mostrarPublicar();
        }

    };

    return (
        <>
            <div className="NuevoPost">
                <div className="NuevoPost-perfil">
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`}>
                        <img src={userState.ImagenPerfil} alt="" />
                    </Link>
                </div>
                <div className='NuevoPost-div' onClick={mostrarPublicar}>
                    <p>¿Qué quieres publicar?</p>
                </div>
            </div>
            {verPublicar && (
                <div className='NuevoPost-Publicar'>
                    <div className='NuevoPost-Publicar-content'>
                        <div className='CardComentarios-content_header'>
                            <h2>Crear publicación</h2>
                            <div className='CardComentarios-content_header_cerrar'>
                                <IonIcon className='Icono-cerrar' onClick={mostrarPublicar} icon={closeCircleOutline} />
                            </div>
                        </div>
                        <div className='NuevoPost-Publicar-post'>
                            <div className="NuevoPost-Publicar-post-perfil">
                                <img src={userState.ImagenPerfil} alt="" />
                                <h4>{userState.NombrePerfil}</h4>
                            </div>
                            <input
                                placeholder='Escribe el título de la publicación'
                                name=""
                                value={inputValue}
                                onChange={handleInputValue}
                            />
                            <div className="NuevoPost-Publicar-post-Publicacion">
                                <div className="NuevoPost-Publicar-post-Publicacion-textarea">
                                    <textarea
                                        placeholder='Escribe aquí tu publicación'
                                        name=""
                                        value={textareaValue}
                                        onChange={handleTextareaInput}
                                        onDrop={handleTextareaDrop}
                                        onPaste={handlePaste}
                                        className="auto-adjust"
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
                                    {youtubeThumbnail && (
                                        <div className="VideoThumbnail">
                                            <img src={youtubeThumbnail} alt="YouTube Video Thumbnail" />
                                            <IonIcon
                                                className='Icono-cerrar'
                                                onClick={() => handleRemovePaste()}
                                                icon={closeCircleOutline}
                                            />
                                        </div>
                                    )}
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
                            <div className='NuevoPost-Publicar-buton'>
                                <button onClick={handleAddPublicacion}>Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NuevoPost