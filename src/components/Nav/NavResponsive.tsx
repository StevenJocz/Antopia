import './NavResponsive.css'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import { Link } from 'react-router-dom'
import { IonIcon } from '@ionic/react'
import { closeCircleOutline } from 'ionicons/icons';
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import logo from '../../assets/imagenes/Logoants.png'

interface Props {
    handleVerMenu: () => void;
}
const NavResponsive: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    return (
        <nav className="NavResponsive">
            <div className='cerrarNavResponsive' onClick={props.handleVerMenu}>
                <IonIcon className='cerrarNavResponsive-icono' icon={closeCircleOutline} />
            </div>
            <img src={logo} alt="Antopia" className='NavResponsive-logo' />
            <ul>
                <Link to='/Home' onClick={props.handleVerMenu}><li className='bg-Icono_home'><img src={Home} alt="" />Inicio</li></Link>
                <Link to='/Home/CriaHormigas' onClick={props.handleVerMenu}><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                <Link to='/Home/ConstrucionHormigueros' onClick={props.handleVerMenu}><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                <Link to='/Home/ExperimentosTecnicas' onClick={props.handleVerMenu}><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>
                <Link to='/Home/Colonias' onClick={props.handleVerMenu}><li className='bg-Icono_cuatro'><img src={IconHormiguero} alt="" />Colonias</li></Link>
            </ul>
            <div className="Layout-menu-imagenes">
                <div className="tooltip-container">
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}/Diarios#Diario`} onClick={props.handleVerMenu}>
                        <img src={diarioIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Diario</div>
                </div>
                <div className="tooltip-container">
                    <Link to={`/Home/Perfil/${userState.IdPerfil}/${userState.urlPerfil}/Fotos#Fotos`} onClick={props.handleVerMenu}>
                        <img src={fotoIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Fotos</div>
                </div>
                <div className="tooltip-container">
                    <Link to={`/Home/Colonias`} onClick={props.handleVerMenu}>
                        <img src={hormigueroIcono} className="sidebar-icon" alt="" />
                    </Link>
                    <div className="tooltip-text">Mi Colonia</div>
                </div>
            </div>
            <div className='NavResponsive-footernav'>
                <a href="">Términos de servicio</a>
                <a href="">Política de privacidad</a>
                <a href="">Política de cookies</a>
                <a href="">Accesibilidad</a>
                <a href="">Información de los anuncios</a>
                <a href="">Más...</a>
                <p>© 2023 Antopia. <span className='desarrollado'>Desarrollado por Steven Jocz</span></p>
            </div>
        </nav>

    )
}

export default NavResponsive