import './Configuracion.css'
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { BotonSubmit } from '../../components/Boton';
import { PostActualizarDatos } from '../../services';


interface Props {
    mostrarConfiguracion: () => void;
    idPerfil: number;
    tipo: number;
    fotoPerfil: string;
    fotoFondo: string;
}

const Configuracion: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputRefFondo = useRef<HTMLInputElement | null>(null);

    const [frase, setFrase] = useState('');
    const [fotoPerfilPreview, setFotoPerfilPreview] = useState('');
    const [fondo, setfondo] = useState('');

    const [fotoPerfilBase64, setFotoPerfilBase64] = useState('');
    const [fondoBase64, setFondoBase64] = useState('');

    const handleActualizar = (tipo: number) => {
        if (tipo === 1) {

            if (frase === '') {
                setMsg('* La frase es un campo requerido, ya que nos permite capturar tu pasión en palabras y expresarla al mundo.');
                setIsLoading(false);
                return;
            } else if (frase.length < 30) {
                setMsg('* ¡Tu pasión por las hormigas merece palabras más extensas! Deja que tu inspiración fluya y comparte una frase que refleje tu amor de manera más completa.');
                setIsLoading(false);
                return;
            } else {
                handleActualizarDatos(props.idPerfil.toString(), '1', frase);
                setMsg('');
                setIsLoading(false);
            }
        } else if (tipo === 2) {
            if (fotoPerfilPreview === '') {
                setMsg('* No haz seleccionado la nueva foto de perfil');
                setIsLoading(false);
                return;
            }
            handleActualizarDatos(props.idPerfil.toString(), '2', fotoPerfilBase64);
            setMsg('');
            setIsLoading(false);
        }else if (tipo === 3) {
            
            if (fondo === '') {
                setMsg('*No haz seleccionado el nueva portada');
                setIsLoading(false);
                return;
            }
            setMsg('');
            handleActualizarDatos(props.idPerfil.toString(), '3', fondoBase64);
            setIsLoading(false);

        }
    }

    const handleActualizarDatos = async (idUser: string, tipo: string, dato: string) => {
        try {
            setIsLoading(true);

            const result = await PostActualizarDatos(idUser, tipo, dato);
            if (result.resultado === false) {
                setMsg(result.message);
            } else {
                window.location.reload();
            }
            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');

            setIsLoading(false);
        }
    };

    const handlePerfilIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFondoClick = () => {
        if (inputRefFondo.current) {
            inputRefFondo.current.click();
        }
    };

    const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setFotoPerfilPreview(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string;
                    setFotoPerfilBase64(base64Image);
                }
            };

            reader.readAsDataURL(files[0]);
        }
    };

    const handleFondoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesFondo = event.target.files;

        if (filesFondo && filesFondo[0]) {
            const imageUrlFondo = URL.createObjectURL(filesFondo[0]);
            setfondo(imageUrlFondo);

            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const base64ImageFondo = e.target.result as string;
                    setFondoBase64(base64ImageFondo);
                }
            };
            reader.readAsDataURL(filesFondo[0]);
        }
    };

    return (
        <div className='Configuracion'>
            <div className="Configuracion-content">
                <div className='CardComentarios-content_header'>
                    <h2>Configuración de perfil</h2>
                    <div className='CardComentarios-content_header_cerrar'>
                        <IonIcon className='Icono-cerrar' onClick={props.mostrarConfiguracion} icon={closeCircleOutline} />
                    </div>
                </div>
                {props.tipo === 1 ? (
                    <div className="paso frase">
                        <p>Demuestra tu profundo cariño y fascinación por las hormigas en su maravilloso universo. ¡Libera tu creatividad y comparte una frase llena de amor!</p>
                        <div className="login__container__group">
                            <textarea
                                name='frase'
                                placeholder='Expresa tu pasión por las hormigas'
                                onChange={(e) => setFrase(e.target.value)}
                            />
                        </div>
                        <i className='mensaje'>{msg}</i>
                        <BotonSubmit texto={'Actualizar'} isLoading={isLoading} onClick={() => handleActualizar(1)} color="guardar" />
                    </div>
                ) : props.tipo === 2 ? (
                    <div>
                        <div className="foto-preview">
                            <img src={fotoPerfilPreview || props.fotoPerfil} alt="Foto de perfil" />
                            <div className='foto-preview-bg' onClick={handlePerfilIconClick}>
                                <p> Seleccionar tu nueva foto de perfil</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                name="fotoPerfil"
                                onChange={handleFotoPerfilChange}
                            />
                        </div>
                        <i className='mensaje'>{msg}</i>
                        <BotonSubmit texto={'Actualizar'} isLoading={isLoading} onClick={() => handleActualizar(2)} color="guardar" />
                    </div>
                ) : (
                    <div>
                        <div className='configuracion-portada'>
                            <div className='configuracion-portada-img'>
                                <img src={fondo || props.fotoFondo} alt="" />
                            </div>
                            <div className='configuracion-portada-bg' onClick={handleFondoClick}>
                                <p> Clic para seleccionar una imagen de portada</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputRefFondo}
                                name="fondo"
                                onChange={handleFondoChange}
                            />
                        </div>
                        <i className='mensaje'>{msg}</i>
                        <BotonSubmit texto={'Actualizar'} isLoading={isLoading} onClick={() => handleActualizar(3)} color="guardar" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default Configuracion