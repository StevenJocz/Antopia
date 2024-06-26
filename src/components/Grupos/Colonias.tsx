import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import { CrearColonia } from './CrearColonia';
import { AppStore } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getUserColonias } from '../../services';
import './Colonias.css';
import { PublicacionesProvider } from '../../Context/PublicacionesContext';
import Card from "../Card/Card";
import { TopColonias } from './TopColonias';

interface Colonia {
    id_colonies: number;
    s_name: string;
    s_photo: string;
    colors: string;
}

const Colonias = () => {
    const [crearColonia, setCrearColonia] = useState(false);
    const userState = useSelector((store: AppStore) => store.user);
    const [listColonia, setListColonia] = useState<Colonia[]>([]);

    const toggleCrearColonia = () => {
        setCrearColonia(!crearColonia);
    };

    useEffect(() => {
        const fetchUserColonias = async () => {
            try {
                const colonias: Colonia[] = await getUserColonias(userState.IdPerfil);
                setListColonia(colonias);
            } catch (error) {
                console.error('Error al obtener las colonias del usuario:', error);
            }
        };
        fetchUserColonias();
    }, [userState.IdPerfil]);

    const recargarColonias = async () => {
        try {
            const colonias = await getUserColonias(userState.IdPerfil);
            setListColonia(colonias);
        } catch (error) {
            console.error('Error al recargar las colonias:', error);
        }
    };


    return (
        <div className='Colonias'>
            <div className='Colonias-header'>
                <h1>Colonias</h1>
                <div className='Colonias-header-navegation'>
                    <Link to={`/Home/Colonias/DescubreColonias`}>
                        <IonIcon className='Colonias-header-icono' icon={search} />
                    </Link>
                    <button onClick={toggleCrearColonia}>Crear colonia</button>
                </div>
            </div>
            <TopColonias tipo={1}/>
            {listColonia.length === 0 ? (
                <p className='colonias-null'>Aún no haces parte de una colonia. Únete a una y comparte tus experiencias..</p>
            ) : (
                <div className='Colonias-content'>
                    <h2>Mis colonias</h2>
                    <div className="Colonias-menu">
                        {listColonia.map(colonia => (
                            <div className="Colonias-menu-content" key={colonia.id_colonies}>
                                <Link
                                    to={`/Home/Colonias/${colonia.id_colonies}/${colonia.s_name.replace(/\s/g, '')}`}
                                >
                                    <img src={colonia.s_photo} alt={colonia.s_name} loading="lazy"/>
                                    <div className="Colonias-menu-content-info" style={{ backgroundColor: colonia.colors }}>
                                        <h4>{colonia.s_name}</h4>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </div>
                    <h2 className='' >Publicaciones de las colonias que soy miembro</h2>
                </div>
            )}
            <div>

                <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={4} hashtag='0'>
                    <Card />
                </PublicacionesProvider>
            </div>
            {crearColonia && (
                <CrearColonia CrearColonia={() => setCrearColonia(false)} recargarColonias={() => recargarColonias()} />
            )}
        </div>
    )
}

export default Colonias