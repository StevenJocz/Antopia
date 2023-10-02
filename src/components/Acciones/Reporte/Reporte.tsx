import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import './Reporte.css'
import { useEffect, useState } from 'react';
import { PublicacionReportinRazon } from '../../../models';
import { PostPublicacionesReporting, getPublicacionesReportingRazon } from "../../../services";
import BotonSubmit from '../../Boton/BotonSubmit';
import { usePublicaciones } from '../../../Context/PublicacionesContext';


interface Props {
    haddleVerReporte: () => void;
    idPublicacion: number;
}

const Reporte: React.FC<Props> = (props) => {
    const [respuestaRazon, setRespuestaRazon] = useState([] as PublicacionReportinRazon[]);
    const [siguiente, setsiguiente] = useState(false);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const { eliminarPublicacion } = usePublicaciones();

    useEffect(() => {
        consultarRazon();
    }, []);

    const consultarRazon = async () => {
        try {
            const resultado: PublicacionReportinRazon[] = await getPublicacionesReportingRazon();
            setRespuestaRazon(resultado);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };


    const ReportarPublicacion = async () => {
        try {
            PostPublicacionesReporting(parseInt(opcionSeleccionada), props.idPublicacion);
            eliminarPublicacion(props.idPublicacion);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };

    const handlesiguiente=() => {
        setsiguiente(true);
    }


    return (
        <div className="Reporte">
            <div className="Reporte-content">
                <div className='CardComentarios-content_header'>
                    <h2>Recopilación de información</h2>
                    <div className='CardComentarios-content_header_cerrar'>
                        <IonIcon className='Icono-cerrar' onClick={props.haddleVerReporte} icon={closeCircleOutline} />
                    </div>
                </div>
                {siguiente ? (
                    <div className='Reporte-content-respuesta'>
                        <h3>Gracias por ayudar a que Antopia sea mejor para todos</h3>
                        <p>Sabemos que no fue fácil, por lo que apreciamos que se tome el tiempo para leer preguntas.</p>
                        <h4>¿Qué está pasando ahora?</h4>
                        <p>Recibimos su informe. Mientras tanto, ocultaremos la publicación denunciada.</p>
                        <h4>¿Qué sigue?</h4>
                        <p>Una de nuestras reinas se encargará de analizar la publicación denunciada en busca de contenido no deseado. Además, emplearemos esta información para mejorar nuestra plataforma y ofrecerte menos contenido de esta índole en el futuro</p>
                        <BotonSubmit texto='Hecho' onClick={ReportarPublicacion} />
                    </div>

                ) : (
                    <div className="Reporte-content-body">
                        {respuestaRazon.map((razon, index) => (
                            <div className="Reporte-content-formulario" key={index}>
                                <div className="Reporte-content-formulario-text">
                                    <h4>{razon.titulo}</h4>
                                    <p>{razon.description}</p>
                                </div>
                                <div className="Reporte-content-formulario-check">
                                    <input
                                        type="radio"
                                        name="razon"
                                        className='option-input'
                                        value={razon.idRazon}
                                        checked={opcionSeleccionada === razon.idRazon}
                                        onChange={() => setOpcionSeleccionada(razon.idRazon)}
                                    />
                                </div>
                            </div>
                        ))}
                        <BotonSubmit texto='Reportar' onClick={handlesiguiente} />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Reporte