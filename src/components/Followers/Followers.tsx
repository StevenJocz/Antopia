

import { useEffect, useState } from 'react';
import './Followers.css'
import { InfoPerfil } from '../../models';
import { Level } from '../Level';
import { Link } from 'react-router-dom';
import { getFollowers } from '../../services';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline} from 'ionicons/icons';
interface Props {
    mostrarFollowers: () => void;
    idUser: number;
    accion: number;
}

const Followers: React.FC<Props> = (props) => {
    const [respuestaFollowers, setRespuestaFollowers] = useState([] as InfoPerfil[]);

    useEffect(() => {
        consultarFollowers()
    }, []);

    const consultarFollowers = async () => {
        try {
            const resultado: InfoPerfil[] = await getFollowers(props.accion,props.idUser);
            setRespuestaFollowers(resultado);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };

    return (
        <div className='Followers'>
            <div className='Followers-content'>
                <div className='Followers-title'>
                    {props.accion === 1 ? (<h3> Seguidores</h3>): (<h3> Seguiendo</h3>) }
                    
                    <div className='Followers-title_cerrar'>
                        <IonIcon className='Icono-cerrar' onClick={props.mostrarFollowers} icon={closeCircleOutline} />
                    </div>
                </div>
                <div className="Followers-body">
                    {respuestaFollowers.map((user, index) => (
                        <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`} onClick={props.mostrarFollowers}>
                            <div className='Contenedor-Usuario' key={index}>
                                <div className='Contenedor-Usuario-icono'>
                                    <img src={user.ImagenPerfil} alt="" />
                                </div>
                                <div className='Contenedor-buscador-Usuario-info'>
                                    <h4>{user.NombrePerfil}</h4>
                                    <p>@{user.urlPerfil}</p>
                                </div>
                                <div>
                                    <Level idlevel={user.Level} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Followers