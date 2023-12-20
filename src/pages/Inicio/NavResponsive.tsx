import { IonIcon } from "@ionic/react"
import { Link } from "react-router-dom"
import { closeCircleOutline } from 'ionicons/icons';
import Logo from '../../assets/imagenes/Logoants.png'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import '../../components/Nav/NavResponsive.css'

interface Props {
    handleVerMenu: () => void;
}

const NavResponsive: React.FC<Props> = (props) => {
    return (
        <nav className="NavResponsive">
            <div className='cerrarNavResponsive' onClick={props.handleVerMenu}>
                <IonIcon className='cerrarNavResponsive-icono' icon={closeCircleOutline} />
            </div>
            <img src={Logo} alt="Antopia" className='NavResponsive-logo' />
            <ul>
                <Link to='/Inicio' onClick={props.handleVerMenu}><li className='bg-Icono_home'><img src={Home} alt="" />General</li></Link>
                <Link to='CriaHormigas' onClick={props.handleVerMenu}><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                <Link to='ConstrucionHormigueros' onClick={props.handleVerMenu}><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                <Link to='ExperimentosTecnicas' onClick={props.handleVerMenu}><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>

            </ul>

            <div className='NavResponsive-footernav'>
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

export default NavResponsive