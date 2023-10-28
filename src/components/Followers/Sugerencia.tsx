import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import { InfoPerfil } from "../../models";
import { getRecomendaFollowers } from "../../services";
import { BotonFollowers } from "../BotonFollowers";
import { Link } from "react-router-dom";
import './Sugerencia.css';

const Sugerencia = () => {
    const userState = useSelector((store: AppStore) => store.user);

    const [respuestaFollowers, setRespuestaFollowers] = useState([] as InfoPerfil[]);

    useEffect(() => {
        consultarFollowers();
        const intervalId = setInterval(consultarFollowers, 180000); // cada 3 minutos
        return () => clearInterval(intervalId);
    }, []);

    const consultarFollowers = async () => {
        try {
            const resultado: InfoPerfil[] = await getRecomendaFollowers(userState.IdPerfil);
            setRespuestaFollowers(resultado);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };

    const imagenExiste = (url: string) => {
        const img = new Image();
        img.src = url;
        return img.complete || img.width > 0;
    };

    const imagenPredeterminada = 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
    return (
        <div className="Sugerencia">
            <h3>A quién seguir</h3>
            {respuestaFollowers.map((user) => (
                <div className="Sugerencia-content" key={user.IdPerfil}>
                    <div className="Sugerencia-content-img">
                        <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`}>
                            <img
                                src={imagenExiste(user.ImagenPerfil) ? user.ImagenPerfil : imagenPredeterminada}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="Sugerencia-content-text">
                        <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`}>
                            <div className="Sugerencia-content-text-info">
                                <h3>{user.NombrePerfil}</h3>
                                <p>@{user.urlPerfil}</p>
                            </div>
                        </Link>
                        <BotonFollowers idPerfil={user.IdPerfil} idSeguidor={userState.IdPerfil} Siguiendo={0} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Sugerencia