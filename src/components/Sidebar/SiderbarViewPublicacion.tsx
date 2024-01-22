import { useEffect, useState } from "react";
import { Barnner } from "../Tiendas"
import { getTopPublicaciones } from "../../services";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { TopPublicacion } from "../../models";


const SiderbarViewPublicacion = () => {
    const [top, setTop] = useState([] as TopPublicacion[]);

    useEffect(() => {
        consultarTop();
    }, [0]);

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
                
            </div>
            <Barnner/>
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