import { IonIcon } from '@ionic/react'
import { personOutline, helpCircleOutline, closeCircleOutline, settingsOutline } from 'ionicons/icons';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import './PerfilAcciones.css'
import { Link } from 'react-router-dom';
import { Logout } from '../../Logout';

interface Props {
    handleMiPerfil: () => void;
}

const PerfilAcciones: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);

    return (
        <div className='MiPerfil_Contenido'>
            <div className='MiPerfil_Contenido_Info'>
                
                <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`} onClick={props.handleMiPerfil}>
                    <div>
                        <h3>{userState.NombrePerfil}</h3>
                        <h4>{userState.email}</h4>
                    </div>
                </Link>
                
                <div className='MiPerfil_Contenido-cerrar'>
                    <IonIcon className='Icono-cerrar' onClick={props.handleMiPerfil} icon={closeCircleOutline} />
                </div>
            </div>
            
            <div className='MiPerfil_Contenido_Controles'>
                <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`} onClick={props.handleMiPerfil}>
                    <div className='MiPerfil_Contenido_text'>

                        <IonIcon icon={personOutline} />
                        <h5> Mi Perfil</h5>

                    </div>
                </Link>
                
                <div className='MiPerfil_Contenido_text'>
                    <IonIcon icon={settingsOutline} />
                    <h5>Configuración</h5>
                </div>
                <div className='MiPerfil_Contenido_text' onClick={props.handleMiPerfil}>
                    <IonIcon icon={helpCircleOutline} />
                    <h5>Ayuda</h5>
                </div>
                <Logout />
            </div>
        </div>
    )
}

export default PerfilAcciones