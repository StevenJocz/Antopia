import './Nav.css'
import logo from '../../assets/imagenes/Logoants.png'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import diarioIcono from '../../assets/imagenes/diarioIcono.png'
import fotoIcono from '../../assets/imagenes/fotos.png'
import hormigueroIcono from '../../assets/imagenes/IconHhormiguero.png'
import insectos from '../../assets/imagenes/insectos.png'
import { Link } from 'react-router-dom'
import { AppStore } from '../../redux/store'
import { useSelector } from 'react-redux'
import { BarraProgreso } from '../BarraProgreso'

const Nav = () => {
    const userState = useSelector((store: AppStore) => store.user);
    return (
        <nav className="Layout-menu">
            <img src={logo} alt="Antopia" />
            <div className='Rango-menu'>
                <BarraProgreso />
            </div>

            <ul>
                <Link to='/Home'><li className='bg-Icono_home'><img src={Home} alt="" />Inicio</li></Link>
                <Link to='/Home/CriaHormigas'><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                <Link to='/Home/ConstrucionHormigueros'><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                <Link to='/Home/ExperimentosTecnicas'><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>
                <Link to='/Home/AlimentoVivo'><li className='bg-Icono_cinco'><img src={insectos} alt="" />Alimento vivo</li></Link>
                <Link to='/Home/Colonias'><li className='bg-Icono_cuatro'><img src={IconHormiguero} alt="" />Colonias</li></Link>
            </ul>
            <div className="Layout-menu-imagenes">
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
            <div className='footernav'>
                <a href="https://about.antopia.org/es/ts" target='_blank'>Términos de servicio</a>
                <a href="https://about.antopia.org/es/tp" target='_blank'>Política de privacidad</a>
                <a href="https://about.antopia.org/es/tc" target='_blank'>Política de cookies</a>
                <a href="https://about.antopia.org" target='_blank'>Accesibilidad</a>
                <a href="https://about.antopia.org/es/ia" target='_blank'>Información de los anuncios</a>
                <a href="https://about.antopia.org" target='_blank'>Más...</a>
                <p>© 2023 Antopia. <span className='desarrollado'>Desarrollado por Steven Jocz</span></p>

            </div>
        </nav>
    )
}

export default Nav