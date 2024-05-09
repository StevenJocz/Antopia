import { useEffect, useRef, useState } from "react";
import { InfoPerfil } from "../../../../models";
import { PostActualizarDatos, getPerfil } from "../../../../services";
import { AppStore } from "../../../../redux/store";
import { useSelector } from "react-redux";
import './ConfiguracionPerfil.css';
import { BotonSubmit } from "../../../../components/Boton";
import { IonIcon } from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

interface Props {
    tipo: number;
}

const Fotos: React.FC<Props> = (props) => {
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);
    const userState = useSelector((store: AppStore) => store.user);
    const [check, setCheck] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputRefFondo = useRef<HTMLInputElement | null>(null);

    const [fotoPerfilPreview, setFotoPerfilPreview] = useState('');
    const [fondo, setfondo] = useState('');

    const [fotoPerfilBase64, setFotoPerfilBase64] = useState('');
    const [fondoBase64, setFondoBase64] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(userState.IdPerfil), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    const fetchedPerfil = fetchedPerfiles[0];
                    setPerfil(fetchedPerfil);
                } else {
                    setPerfil(null);
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        fetchPerfil();
    }, [userState.IdPerfil]);

    const handleActualizar = (tipo: number) => {
        if (tipo === 1) {
            if (fotoPerfilPreview === '') {
                setMsg(' No haz seleccionado la nueva foto de perfil');
                setIsLoading(false);
                setCheck(false);
                return;
            }
            handleActualizarDatos(userState.IdPerfil.toString(), '2', fotoPerfilBase64);
            setMsg('');
            setIsLoading(false);
        } else if (tipo === 2) {

            if (fondo === '') {
                setMsg('No haz seleccionado la nueva portada');
                setIsLoading(false);
                setCheck(false);
                return;
            }
            setMsg('');
            handleActualizarDatos(userState.IdPerfil.toString(), '3', fondoBase64);
            setIsLoading(false);

        }
    }

    const handleActualizarDatos = async (idUser: string, tipo: string, dato: string) => {
        try {
            setIsLoading(true);

            const result = await PostActualizarDatos(idUser, tipo, dato);
            if (result.resultado === false) {
                setMsg(result.message);
                setCheck(false);
            } else {
                setMsg(result.message);
                setCheck(true);
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
        <div className="Configuracion-Foto">
            {props.tipo === 1 ? (
                <div>
                    <div className="foto-preview">
                        <img src={fotoPerfilPreview || perfil?.ImagenPerfil} alt="Antopia" />
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
                    {msg != '' && (
                        check ? (
                            <IonIcon className='IconocheckTrue' icon={checkmarkCircleOutline} />
                        ) : (
                            <IonIcon className='IconocheckFalse' icon={closeCircleOutline} />
                        )
                    )}
                    <i className={`${check == true ? "MsnCorrecto" : "MsnInCorrecto"}`}>{msg}</i>
                    <BotonSubmit texto={'Actualizar'} isLoading={isLoading} onClick={() => handleActualizar(1)} color="enviar" />
                </div>
            ) : (
                <div>
                    <div className='configuracion-portada'>
                        <div className='configuracion-portada-img'>
                            <img src={fondo || perfil?.ImagenPortada} alt="Antopia" />
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
                    {msg != '' && (
                        check ? (
                            <IonIcon className='IconocheckTrue' icon={checkmarkCircleOutline} />
                        ) : (
                            <IonIcon className='IconocheckFalse' icon={closeCircleOutline} />
                        )
                    )}
                    <i className={`${check == true ? "MsnCorrecto" : "MsnInCorrecto"}`}>{msg}</i>
                    <BotonSubmit texto={'Actualizar'} isLoading={isLoading} onClick={() => handleActualizar(2)} color="enviar" />
                </div>
            )}
        </div>

    )
}

export default Fotos