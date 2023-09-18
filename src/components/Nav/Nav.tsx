import './Nav.css'
import logo from '../../assets/imagenes/Logoants.png'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="Layout-menu">
            <img src={logo} alt="" />
            <ul>
                <Link to='/Home'><li className='bg-Icono_home'><img src={Home} alt="" />Inicio</li></Link>
                <Link to='/Home/CriaHormigas'><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                <Link to='/Home/ConstrucionHormigueros'><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                <Link to='/Home/ExperimentosTecnicas'><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>
                <Link to='/Home/Colonias'><li className='bg-Icono_cuatro'><img src={IconHormiguero} alt="" />Colonias</li></Link>
            </ul>
        </nav>
    )
}

export default Nav