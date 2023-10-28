
import { Link, useLocation } from 'react-router-dom';
import './MiColonia.css'
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getMiColonia } from '../../../services';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { Colonia } from '../../../models';
import { MicoloniaRouter } from './MicoloniaRouter';
import { PostUnirmeColonia } from '../../../services';
import { Helmet } from 'react-helmet';

const MiColonia = () => {

    const userState = useSelector((store: AppStore) => store.user);
    const [grupo, setGrupo] = useState<Colonia | null>(null);
    const [esMiembro, setEsMiembro] = useState<number>(0);
    const location = useLocation();


    const idgrupo = location.pathname.split("/")[3];
    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getMiColonia(Number(idgrupo), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setGrupo(fetchedPerfiles[0]);
                    setEsMiembro(fetchedPerfiles[0]?.esmember || 0);

                } else {
                    setGrupo(null);
                }
            } catch (error) {
                console.error('Error al obtener el grupo:', error);
            }
        }

        fetchPerfil();
    }, [idgrupo]);


    const backgroundImageUrl = grupo?.s_photo;
    const back = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPositionY: '75%',
    };


    const handleUnirmeColonia = async () => {
        try {
            const resultado = await PostUnirmeColonia(grupo?.id_colonies || 0, userState.IdPerfil, esMiembro);
            if (resultado.resultado == true && esMiembro == 1) {
                setEsMiembro(0)
            } else if (resultado.resultado == true && esMiembro == 0) {
                setEsMiembro(1)
            }
        } catch (error) {
        }
    }

    return (
        <>
            <Helmet>
                <title>Antopia | Colonia </title>
            </Helmet>
            <div className='MiGrupo'>
                <div className='MiGrupo-navegacion'>
                    <Link to={`/Home/Colonias`} >
                        <IonIcon className='volver-icono' icon={arrowBack} />
                        <p>Volver</p>
                    </Link>
                    <h2>{grupo?.s_name}</h2>
                </div>

                <div className="MiGrupo-portada" style={back}>
                    <div className="MiGrupo-info" style={{ backgroundColor: grupo?.s_colors }}>
                        <h2>{grupo?.s_name}</h2>
                        <p>{grupo?.s_description}</p>
                        <div className='MiGrupo-user'>
                            {grupo?.userMembers.map((miembro) => (
                                <img src={miembro.foto} alt={miembro.nombre} key={miembro.id_user} />
                            ))}
                            <p> {grupo?.cantidadMembers} {grupo?.cantidadMembers === 1 ? 'Miembro' : 'Miembros'}</p>
                            <button className='MiGrupo-btn' onClick={handleUnirmeColonia}>{esMiembro == 1 ? 'Abandonar' : 'Unirme'}</button>
                        </div>
                    </div>
                </div>
                <div className='MiGrupo-Menu'>
                    <ul>
                        <Link to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/`}><li>Conversación</li></Link>
                        <Link
                            to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/fotos`}
                           
                        ><li>Imagenes</li>
                        </Link>
                        <Link to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/about`}><li>Acerca de</li></Link>
                    </ul>
                </div>
                <div>
                    <MicoloniaRouter grupo={grupo} />
                </div>

            </div>
        </>
    )
}

export default MiColonia