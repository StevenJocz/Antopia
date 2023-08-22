
import { BarraProgreso } from "../BarraProgreso"
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'
import './Sidebar.css'



const Sidebar = () => {
    return (
        <div>
            <BarraProgreso percent={50} skill="Huevo" />
            <div className="sidebar-menu">
                <img src={diarioIcono} className="sidebar-icon" alt="" />
                <img src={fotoIcono} className="sidebar-icon" alt="" />
                <img src={hormigueroIcono} className="sidebar-icon" alt="" />
                <img src={diarioIcono} className="sidebar-icon" alt="" />
            </div>
        </div>
    )
}

export default Sidebar