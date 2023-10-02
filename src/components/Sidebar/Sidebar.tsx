
import { BarraProgreso } from "../BarraProgreso"
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'

import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Sidebar.css'
import { Link } from "react-router-dom";
import { SliderEcomerce } from "../Slider";
import { BotonFollowers } from "../BotonFollowers";
import { useEffect, useState } from "react";
import { InfoPerfil } from "../../models";
import { getRecomendaFollowers } from "../../services";


const Sidebar = () => {
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

    return (
        <div>
            <BarraProgreso percent={50} level={userState.Level} />
            <div className="sidebar-menu">
                <div className="tooltip-container">
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}/Diarios#Diario`}>
                        <img src={diarioIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Diario</div>
                </div>
                <div className="tooltip-container">
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}/Fotos#Fotos`}>
                        <img src={fotoIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Fotos</div>
                </div>
                <div className="tooltip-container">
                    <Link to={`/Home/Colonias`}>
                        <img src={hormigueroIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Mi Colonia</div>
                </div>
            </div>
            <div className="sidebar-content siderbar-ecomerce">
                <div className="siderbar-ecomerce-encabezado">
                    <div className="siderbar-ecomerce-encabezado-recomendado">
                        <p>Recomendado</p>
                    </div>
                    <div>
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/21d54842-ce16-4903-890c-c98eb2616504.jpg" alt="" />
                        <h2>Gran Hormiga</h2>
                    </div>
                    <p>En nuestra tienda, encontrarás una amplia selección de productos  para satisfacer todas tus necesidades hormigueras</p>
                </div>
                <div className="siderbar-ecomerce-contect">
                    <a href="https://wa.me/3134537977" target="_blank">
                        <SliderEcomerce />
                    </a>
                </div>
            </div>
            <div className="sidebar-content">
                <h3>A quién seguir</h3>
                {respuestaFollowers.map((user, index) => (
                    <div className="sidebar-content-follow" key={index}>
                        <div className="sidebar-content-follow-img">
                            <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`}>
                                <img src={user.ImagenPerfil} alt="" />
                            </Link>
                        </div>
                        <div className="sidebar-content-follow-text">
                            <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`}>
                                <div className="sidebar-content-follow-text-info">
                                    <h3>{user.NombrePerfil}</h3>
                                    <p>@{user.urlPerfil}</p>
                                </div>
                            </Link>
                            <BotonFollowers idPerfil={user.IdPerfil} idSeguidor={userState.IdPerfil} Siguiendo={0} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar