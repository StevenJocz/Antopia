import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';

import './EliminarPublicacion.css';
import BotonSubmit from '../../Boton/BotonSubmit';
import { usePublicaciones } from '../../../Context/PublicacionesContext';
import { deletePostPublicacion } from "../../../services";


interface Props {
    haddleVerEliminar: () => void;
    idPublicacion: number;
}

const EliminarPublicacion: React.FC<Props> = (props) => {
    const { eliminarPublicacion } = usePublicaciones();

    const EliminarPublicacion = async () => {
        try {
            
            deletePostPublicacion(props.idPublicacion);
            eliminarPublicacion(props.idPublicacion);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };


    return (
        <div className='EliminarPublicacion'>
            <div className="EliminarPublicacion-content">
                <div className='CardComentarios-content_header'>
                    <h2>Recopilación de información</h2>
                    <div className='CardComentarios-content_header_cerrar'>
                        <IonIcon className='Icono-cerrar' onClick={props.haddleVerEliminar} icon={closeCircleOutline} />
                    </div>
                </div>
                <p>¿Realmente desea eliminar esta publicación?</p>
                <div className='EliminarPublicacion-boton'>
                    <BotonSubmit texto='Si, eliminar' onClick={EliminarPublicacion}  color='eliminar'/>
                    <div className='EliminarPublicacion-boton_separador'></div>
                    <BotonSubmit texto='No, cancelar' onClick={props.haddleVerEliminar} />
                    
                </div >

            </div>
        </div>
    )
}

export default EliminarPublicacion