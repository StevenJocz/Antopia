import React, { useEffect, useState } from 'react';
import { getPerfil } from '../../../services';
import './PreviewPerfil.css';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { InfoPerfil } from '../../../models';
import { Level } from '../../Level';
import { BotonFollowers } from '../../BotonFollowers';
import { Link } from 'react-router-dom';

interface Props {
    idPerfil: number;
    urlPerfil: string;
    idPublicacion: number;
    handleMouseEnter: (idPublicacion: number, idPerfil: number) => void;
    handleMouseLeave: (idPublicacion: number) => void;
}

const PreviewPerfil: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);


    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(props.idPerfil), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setPerfil(fetchedPerfiles[0]);
                } else {
                    setPerfil(null);
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            } finally {
            }
        }

        if (props.idPerfil) {
            fetchPerfil();
        } else {
            setPerfil(null);
        }
    }, [props.idPerfil, userState.IdPerfil]);


    if (!perfil) {
        return null;
    }

    return (
        <div className='PreviewPerfil'
            onMouseEnter={() => props.handleMouseEnter(props.idPublicacion, perfil.IdPerfil)}
            onMouseLeave={() => props.handleMouseLeave(props.idPublicacion)}
        >
            <div className='PreviewPerfil-content'>
                <Link to={`/Home/Perfil/${perfil.IdPerfil}/${perfil.urlPerfil}`}>
                    <img src={perfil.ImagenPerfil} alt="" />
                </Link>
                <BotonFollowers idPerfil={perfil.IdPerfil} idSeguidor={userState.IdPerfil} Siguiendo={perfil.Siguiendo} />
            </div>
            <div className='PreviewPerfil-content-nombre'>
                <div>
                    <Link to={`/Home/Perfil/${perfil.IdPerfil}/${perfil.urlPerfil}`}>
                        <h3>{perfil.NombrePerfil}</h3>
                        <p>@{props.urlPerfil}</p>
                    </Link>
                </div>
                <Level idlevel={perfil.Level} />
            </div>
            <div className='PreviewPerfil-content-frase'>
                <p>{perfil.Frase}</p>
            </div>
            <div className='PreviewPerfil-content-segudores'>
                <p><span>{perfil.Seguidores}</span> seguidores</p>
                <p ><span>{perfil.TotalSeguiendo}</span> Siguiendo</p>
            </div>

        </div>
    );
};

export default PreviewPerfil;
