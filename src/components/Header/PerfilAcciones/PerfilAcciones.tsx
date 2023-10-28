import { IonIcon } from '@ionic/react'
import { personOutline, helpCircleOutline, /*settingsOutline*/} from 'ionicons/icons';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import './PerfilAcciones.css'
import { Link } from 'react-router-dom';
import { Logout } from '../../Logout';



const PerfilAcciones = () => {
    const userState = useSelector((store: AppStore) => store.user);

    return (
        <div className='MiPerfil_Contenido'>
            <div className='MiPerfil_Contenido_Info'>
                <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`}>
                    <div>
                        <h3>{userState.NombrePerfil}</h3>
                        <h4>{userState.email}</h4>
                    </div>
                </Link>
            </div>
            <div className='MiPerfil_Contenido_Controles'>
                <div className='MiPerfil_Contenido_text'>
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}`}>
                        <IonIcon icon={personOutline} />
                        <h5> Mi Perfil</h5>
                    </Link>
                </div>
                {/* <div className='MiPerfil_Contenido_text'>
                    <IonIcon icon={settingsOutline} />
                    <h5>Configuración</h5>
                </div> */}
                <div className='MiPerfil_Contenido_text'>
                    <IonIcon icon={helpCircleOutline} />
                    <h5>Ayuda</h5>
                </div>
                <Logout />
            </div>
        </div>
    )
}

export default PerfilAcciones