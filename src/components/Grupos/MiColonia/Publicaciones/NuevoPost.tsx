
import { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, happyOutline, cameraOutline } from 'ionicons/icons';
import '../../../NuevoPost/NuevoPost.css'
import { Emoticones } from '../../../Emoticones';
import { Link } from 'react-router-dom';
import { Colonia, ColoniaCrearPublicacion} from '../../../../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { PostColoniaPublicacion } from '../../../../services';

interface Props {
    grupo: Colonia | null;
}
const NuevoPost: React.FC<Props> = (props) => {
    const [verPublicar, setVerPublicar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [hashtags, setHashtags] = useState<string>('');

    const [verEmoticos, setVerEmoticos] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const userState = useSelector((store: AppStore) => store.user);
    const { grupo } = props;

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



    const capturarHashtags = (texto: string) => {
        const regex = /#(\S+)/gi; // Expresión regular para buscar hashtags
        const hashtagsEncontrados = [];
        let match;

        while ((match = regex.exec(texto))) {
            const hashtag = `#${match[1]}`; // Mantener la capitalización original
            hashtagsEncontrados.push(hashtag);
        }

        return hashtagsEncontrados.join(' '); // Unir los hashtags con un espacio
    };


    useEffect(() => {
        const nuevosHashtags = capturarHashtags(textareaValue);
        setHashtags(nuevosHashtags);
    }, [textareaValue]);



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

                // Limpia los valores relacionados con YouTube
                setYoutubeThumbnail('');
                setYoutubeUrl('');
            } catch (error) {
                console.error('Error al convertir imágenes a base64:', error);
            }
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

    const nuevaPublicacion: ColoniaCrearPublicacion = {
        id_colonies: grupo?.id_colonies || 0,
        s_title: inputValue,
        s_content: textareaValue,
        s_hashtags: hashtags,
        idPerfil: userState.IdPerfil,
        video: youtubeUrl || '',
        images: base64Images,
    };

    const handleAddPublicacion = async () => {
        if (inputValue === '') {
            alert('Ingrese un título');
        } else if (textareaValue === '') {
            alert('Ingrese un contenido');
        } else {
            await PostColoniaPublicacion(nuevaPublicacion);

            setYoutubeThumbnail('');
            setYoutubeUrl('');
            setInputValue('');
            setTextareaValue('');
            setSelectedImages([]);
            setBase64Images([]);
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