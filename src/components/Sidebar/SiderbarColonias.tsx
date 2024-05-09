import { useEffect, useState } from "react";
import { Colonia } from "../../models";
import { getBuscarColonia } from "../../services";
import { Link } from "react-router-dom";
import { Barnner } from "../Tiendas";


const SiderbarColonias = () => {
    const [respuesta, setRespuesta] = useState([] as Colonia[]);

    // Enviar la palabra inicial al servicio cuando se monte el componente
    useEffect(() => {
        async function enviarBusquedaInicial() {
            try {
                const resultado = await getBuscarColonia('1');
                setRespuesta(resultado);
            } catch (error) {
                console.error('Error al consultar el servicio:', error);
            }
        }

        enviarBusquedaInicial();
    }, []);

    return (
        <>
            < Barnner />
            <div className="sidebar-content">
                <h3>Colonias </h3>
                {respuesta.map((top, index) => (
                    <Link to={`/Home/Colonias/${top.id_colonies}/${top.s_name.replace(/\s/g, '')}`} className={index === 0 ? 'numeroUno' : ''} key={index}>
                        <div className="SidebarPublicacion-conte" key={index}>

                            <div className="SidebarPublicacion-text ">
                                <div className="Sidebar-top">
                                    <img src={top.s_photo} alt="" />
                                    <div>
                                        <h1>{top.s_name}</h1>
                                        <p>{top.cantidadMembers} Miembros - {top.points} puntos  </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default SiderbarColonias