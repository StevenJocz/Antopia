import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import NoImagen from '../../../assets/imagenes/NoImagen.png'
import Nocreate from '../../../assets/imagenes/nocreate.png'

import './CrearColonia.css';
import { useRef, useState } from 'react';
import { BotonSubmit } from '../../Boton';
import { PostRegistroColonia } from '../../../services';

interface Props {
    CrearColonia: () => void;
    recargarColonias: () => void;
}

export const CrearColonia: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const inputRefFondo = useRef<HTMLInputElement | null>(null);
    const [fondo, setfondo] = useState('');
    const [fondoBase64, setFondoBase64] = useState('');
    const [color, setColor] = useState('#f4a460');

    const handleFondoClick = () => {
        if (inputRefFondo.current) {
            inputRefFondo.current.click();
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

  

    const handleGuardarColonia = async () => {
        try {

            if (nombre === '') {
                setMsg('El nombre de la colonia es obligatorio.');
                return;
            } else if (descripcion === '') {
                setMsg('La descripción de la colonia es obligatoria.');
                return;
            } else if (fondo === '') {
                setMsg('La imagen de fondo es obligatoria.');
                return;
            } else {

                const result = await PostRegistroColonia(nombre, descripcion, userState.IdPerfil, fondoBase64, color);

                if (result.resultado === false) {

                    setMsg(result.msg);

                } else {
                    props.CrearColonia();
                    props.recargarColonias();
                }
            }

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    }

    return (
        <div className='CrearColonia'>
            <div className='CrearColonia-content'>
                <div className='CrearColonia_header'>
                    <h2>Crear colonia</h2>
                    <IonIcon className='Icono-cerrar' onClick={props.CrearColonia} icon={closeCircleOutline} />
                </div>
                {userState.Level == 6 ? (
                    <>

                        <div className='CrearColonia_formulario'>
                            <div className="CrearColonia_formulario-input">
                                <input
                                    placeholder='Escribe el nombre de la colonia'
                                    name="nombreColonia"
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="CrearColonia_formulario-input">
                                <textarea
                                    placeholder='Describa de qué se tratará la colonia o proporcione una breve descripción...'
                                    name="descriptionColonia"
                                    className="auto-adjust"
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                            <div className="CrearColonia_formulario-input">
                                <div className='configuracion-portada CrearColonia_formulario-input-imagen'>
                                    <img src={fondo || NoImagen} alt="" />
                                    <div className='configuracion-portada-bg' onClick={handleFondoClick}>
                                        <p> Clic para seleccionar una imagen para la colonia</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={inputRefFondo}
                                        name="fondo"
                                        onChange={handleFondoChange}
                                    />
                                </div>
                            </div>
                            <div className="CrearColonia_formulario-input inputcolor">
                                <label htmlFor="colorColonia">Color de la colonia:</label>
                                <div className="color-preview-container">
                                    <input
                                        type="color"
                                        id="colorColonia"
                                        name="colorColonia"
                                        onChange={(e) => setColor(e.target.value)}
                                        value={color}
                                    />
                                </div>
                            </div>

                            <i className='mensaje'>{msg}</i>
                            <BotonSubmit texto='Crear colonia' isLoading={isLoading} onClick={() => handleGuardarColonia()} color="guardar" />
                        </div>
                    </>
                ) : (
                    <div className="Nocreate">
                        <img src={Nocreate} alt="" />
                        <p>¡Continúa participando activamente en Antopia y alcanza el nivel 'Reina' para desbloquear la capacidad de crear colonias exclusivas! ¡Sigue interactuando y contribuyendo para ascender de nivel y acceder a esta emocionante función!</p>
                    </div>
                )}
            </div>


        </div>
    )
}
