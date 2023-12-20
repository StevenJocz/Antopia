import { useState } from "react";
import Typewriter from "typewriter-effect";
import Logo from '../../assets/imagenes/Logoants.png'
import IconAnt from '../../assets/imagenes/IconAnts.png'
import IconHormiguero from '../../assets/imagenes/hormiguero.png'
import Home from '../../assets/imagenes/eco-home.png'
import { Link, Route } from "react-router-dom";
import { Recomendados } from "../../components/Tiendas";
import { Tendencias } from "../../components/Tendencias";
import { RoutesWithNotFound } from "../../utilities";
import InicioAntopia from "./Inicio/Inicio";
import ConstrucionHormigueros from "./ConstrucionHormigueros/ConstrucionHormigueros";
import CriaHormigas from "./CriaHormigas/CriaHormigas";
import TecnicasExerimentos from "./TecnicasExerimentos/TecnicasExerimentos";
import Publicacion from "./Publicacion/Publicacion";
import { IonIcon } from "@ionic/react";
import { menuOutline } from 'ionicons/icons';
import './Inicio.css'
import '../../components/Nav/Nav.css'
import '../../components/TopBar/TopBar.css'
import NavResponsive from "./NavResponsive";


const Inicio = () => {
    const [verMenu, setVerMenu] = useState(false);

    const handleVerMenu = () => {
        setVerMenu(!verMenu);
    }

    return (
        <div className="Inicio">
            <div className="Layout">
                <nav className="Layout-menu">
                    <img src={Logo} alt="Antopia" />
                    <ul>
                        <Link to='/Inicio' ><li className='bg-Icono_home'><img src={Home} alt="" />General</li></Link>
                        <Link to='CriaHormigas' ><li className='bg-Icono_Uno'><img src={IconAnt} alt="" />Cría de Hormigas</li></Link>
                        <Link to='ConstrucionHormigueros' ><li className='bg-Icono_dos'><img src={IconHormiguero} alt="" />Construcción de hormigueros</li></Link>
                        <Link to='ExperimentosTecnicas' ><li className='bg-Icono_tres'><img src={IconAnt} alt="" />Experimentos y técnicas</li></Link>

                    </ul>
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
                <aside className="Layout-sidebar-right">
                    <div className="Inicio_Layout-sidebar-right">
                        <h1>
                            <Typewriter
                                options={{
                                    strings: [' Explora', ' Descubre', ' Aprende', 'Comparte', 'Sumérgete'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <h2> En el cautivador mundo de Antopia, la red social para entusiastas de las hormigas.</h2>
                        <Link to='/Registro'>Únete</Link>
                    </div>
                    <Tendencias />
                    <Recomendados />
                </aside>
                <div className="Layout-top">
                    <div className='Inicio-Header-logo'>
                        <img src={Logo} alt="" />
                    </div>
                    <Link to='/'>Iniciar Sesión</Link>
                </div>
                <main className="Layout-main" id='Layout-main'>
                    <RoutesWithNotFound>
                        <Route path="/" element={<InicioAntopia />} />
                        <Route path="/CriaHormigas" element={<CriaHormigas />} />
                        <Route path="/ConstrucionHormigueros" element={<ConstrucionHormigueros />} />
                        <Route path="/ExperimentosTecnicas" element={<TecnicasExerimentos />} />
                        <Route path="/Publicacion/:id/*" element={<Publicacion />} />
                    </RoutesWithNotFound>
                </main>
            </div>

            <nav className="TopBar">
                <a ><IonIcon onClick={handleVerMenu} className='' icon={menuOutline} /></a>
            </nav>

            {verMenu && (

                <NavResponsive handleVerMenu={() => setVerMenu(false)} />
            )}
        </div>
    )
}

export default Inicio