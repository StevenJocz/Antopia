import { useEffect, useState } from "react";
import { Barnner } from "../Tiendas"
import { getPublicacionesSimilares, getTopPublicaciones } from "../../services";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { PublicacionBuscador, TopPublicacion } from "../../models";


const SiderbarViewPublicacion = () => {
    const [top, setTop] = useState([] as TopPublicacion[]);
    const [respuesta, setRespuesta] = useState([] as PublicacionBuscador[]);
    const location = useLocation();
    const texto = location.pathname.split("/")[4].replace(/-/g, ' ');

    const consultar = async () => {
        try {
            const resultado: PublicacionBuscador[] = await getPublicacionesSimilares(texto);
            setRespuesta(resultado);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };

    useEffect(() => {
        consultarTop();
        consultar();
    }, [texto]);

    const consultarTop = async () => {
        try {
            const resultadoTop = await getTopPublicaciones(0);
            setTop(resultadoTop);
        } catch (error) {
            console.error('Error al obtener el grupo:', error);
        }
    };
    return (
        <div>
            <div className="sidebar-content">
                <h3>Relacionados </h3>
                {respuesta.map((respuesta, index) => (

                    <Link to={`/Home/Publicacion/${respuesta.IdPublicacion}/${encodeURIComponent(respuesta.Titulo.toLowerCase().replace(/ /g, '-'))}`}>
                        <div className="SidebarPublicacion-conte" key={index}>
                            <h4>{index + 1}</h4>
                            <div className="SidebarPublicacion-text">
                                <h1>{respuesta.Titulo}</h1>
                                <div className="SidebarPublicacion-perfil">
                                    <img src={respuesta.ImagenPerfil} alt="" />
                                    <p>{respuesta.NombrePerfil}</p>
                                    <p>-</p>
                                    <p>{format(new Date(respuesta.FechaPublicacion), "dd 'de' MMMM")}  </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
            <Barnner />
            <div className="sidebar-content">
                <h3>Populares </h3>
                {top.map((top, index) => (
                    <Link to={`/Home/Publicacion/${top.IdPublicacion}/${encodeURIComponent(top.Titulo.toLowerCase().replace(/ /g, '-'))}`}>
                        <div className="SidebarPublicacion-conte" key={index}>
                            <h4>{index + 1}</h4>
                            <div className="SidebarPublicacion-text">
                                <h1>{top.Titulo}</h1>
                                <div className="SidebarPublicacion-perfil">
                                    <img src={top.Foto} alt="" />
                                    <p>{top.NombrePerfil}</p>
                                    <p>-</p>
                                    <p>{format(new Date(top.FechaPublicacion), "dd 'de' MMMM")}  </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SiderbarViewPublicacion