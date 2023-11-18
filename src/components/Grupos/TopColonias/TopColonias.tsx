import { Link } from "react-router-dom"
import './TopColonias.css'
import { useEffect, useState } from "react";
import { ColoniaTop } from "../../../models";
import { getTopColonia } from "../../../services";

const TopColonias = () => {

    const [respuestaTop, setRespuestaTop] = useState([] as ColoniaTop[]);

    useEffect(() => {
        consultarTop();
        const intervalId = setInterval(consultarTop, 300000); // cada 5 minutos
        return () => clearInterval(intervalId);
    }, []);

    const consultarTop = async () => {
        try {

            const resultadoTop: ColoniaTop[] = await getTopColonia();
            setRespuestaTop(resultadoTop);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };


    return (
        <div className='sidebar-content'>
            <h3>Top colonias</h3>
            <div className="Colonias-Top" >
                {respuestaTop.map((top, index) => (
                    <Link to={`/Home/Colonias/${top.id_colonies}/${top.s_name.replace(/\s/g, '')}`} className={index === 0 ? 'numeroUno' : ''} key={index}>
                        <img src={top.s_photo} alt={top.s_name} />
                        <h4>{top.s_name}</h4>
                        <p>{top.points} puntos </p>
                        <h1>#{index + 1}</h1>
                    </Link>
                ))}
            </div>
            
        </div>
    )
}

export default TopColonias