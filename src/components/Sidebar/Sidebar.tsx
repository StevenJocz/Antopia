
import { BarraProgreso } from "../BarraProgreso"
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'

import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Sidebar.css'
import { Link } from "react-router-dom";



const Sidebar = () => {
    const userState = useSelector((store: AppStore) => store.user);

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
        </div>
    )
}

export default Sidebar