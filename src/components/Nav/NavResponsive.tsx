import './NavResponsive.css'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import { Link } from 'react-router-dom'
import { IonIcon } from '@ionic/react'
import { closeCircleOutline } from 'ionicons/icons';
import { Sidebar } from '../Sidebar'

interface Props {
    handleVerMenu: () => void;
}
const NavResponsive: React.FC<Props> = (props) => {
    return (
        <nav className="NavResponsive">
            <div className='cerrarNavResponsive' onClick={props.handleVerMenu}>
                <IonIcon className='cerrarNavResponsive-icono' icon={closeCircleOutline} />
            </div>
            <div className='NavResponsive-sidebar' onClick={props.handleVerMenu}>
                <Sidebar/>
            </div>
            <ul>
                <Link to='/Home' onClick={props.handleVerMenu}><li className='bg-Icono_home'><img src={Home} alt="" />Inicio</li></Link>
                <Link to='/Home/CriaHormigas' onClick={props.handleVerMenu}><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                <Link to='/Home/ConstrucionHormigueros' onClick={props.handleVerMenu}><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                <Link to='/Home/ExperimentosTecnicas' onClick={props.handleVerMenu}><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>
            </ul>
           
            
        </nav>
        
    )
}

export default NavResponsive