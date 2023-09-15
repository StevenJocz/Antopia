import { Route } from 'react-router-dom';
import { RoutesWithNotFound } from '../../../utilities';
import './Home.css'
import { lazy} from 'react';
import { Grupo } from '../../../components/Grupos';
const Nav = lazy(() => import('../../../components/Nav/Nav'));
const Inicio = lazy(() => import('./Inicio/Inicio'));
const CriaHormigas = lazy(() => import('./CriaHormigas/CriaHormigas'));
const ConstrucionHormigueros = lazy(() => import('./ConstrucionHormigueros/ConstrucionHormigueros'));
const TecnicasExerimentos = lazy(() => import('./TecnicasExerimentos/TecnicasExerimentos'));
const Sidebar = lazy(() => import('../../../components/Sidebar/Sidebar'));
const Header = lazy(() => import('../../../components/Header/Header'));
const Perfil = lazy(() => import('../../../components/Perfil/Perfil'));
const Hashtag = lazy(() => import('./Hashtag/Hashtag'));


const Home: React.FC = () => {
  
  return (
    <div className="Layout">
      <nav className="Layout-menu">
        <Nav />
      </nav>
      <aside className="Layout-sidebar-right">
        <Sidebar />
      </aside>
      <div className="Layout-top">
        <Header />
      </div>
      <main className="Layout-main" id='Layout-main'>
          <RoutesWithNotFound>
            <Route path="/" element={<Inicio />} />
            <Route path="/CriaHormigas" element={<CriaHormigas />} />
            <Route path="/ConstrucionHormigueros" element={<ConstrucionHormigueros />} />
            <Route path="/ExperimentosTecnicas" element={<TecnicasExerimentos />} />
            <Route path="/Perfil/*" element={<Perfil />} />
            <Route path="/Grupo/*" element={<Grupo />} />
            <Route path="/Hashtag/:hashtag/*" element={<Hashtag />} />
          </RoutesWithNotFound>
      </main>
    </div>
  )
}
export default Home;
