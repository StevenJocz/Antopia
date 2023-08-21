import './Acciones.css'
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoInstagram, closeCircleOutline, warningOutline } from 'ionicons/icons';

interface Props {
    mostrarAcciones: () => void;
}

const Acciones: React.FC<Props> = (props) => {
    return (
        <div className='Acciones'>
            <div className='Acciones_cerrar'>
                <IonIcon className='Icono-cerrar' onClick={() => props.mostrarAcciones()} icon={closeCircleOutline} />
            </div>


            <a href=""> <IonIcon icon={warningOutline} className='Acciones-icon' />  Reportar publicación</a>
            <div className='Acciones_compartir'>
                <p>Compartir en:</p>
                <div>
                    <a href=""> <IonIcon icon={logoFacebook} className='Acciones-icon' /></a>
                    <a href=""> <IonIcon icon={logoInstagram} className='Acciones-icon' /></a>
                    <a href=""> <IonIcon icon={logoTwitter} className='Acciones-icon' /></a>
                </div>

            </div>
        </div>
    )
}

export default Acciones