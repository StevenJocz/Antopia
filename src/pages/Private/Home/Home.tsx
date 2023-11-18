import { Route, useNavigate } from 'react-router-dom';
import { RoutesWithNotFound, clearLocalStorage } from '../../../utilities';
import './Home.css'
import { lazy, useEffect} from 'react';
import ColoniaRouter from '../../../components/Grupos/ColoniaRouter';
import { Publicacion } from './Publicacion';
import { Buscador } from './Buscador';
import { Noticas } from './Noticias';
import { resetUser,  UserKey, TokenKey} from '../../../redux/states/user';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
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
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionExp =  parseInt(userState.exp);  // Reemplaza esto con el valor real de exp en tu sesión
    const currentTime = Math.floor(Date.now() / 1000);

    // Verifica si la sesión ha expirado
    if (sessionExp < currentTime) {
      // La sesión ha expirado, realiza el logout y redirige al usuario al login
      logOut();
    }
  }, [navigate]);

  const logOut = () => {
    clearLocalStorage(UserKey);
    clearLocalStorage(TokenKey);
    resetUser();
    navigate('/', { replace: true });
  };

  
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
            <Route path="/Publicacion/:id/*" element={<Publicacion/>} />
            <Route path="/Colonias/*" element={<ColoniaRouter />} />
            <Route path="/Hashtag/:hashtag/*" element={<Hashtag />} />
            <Route path="/Buscar/*" element={<Buscador />} />
            <Route path="/Felicidades/*" element={<Noticas />} />
          </RoutesWithNotFound>
      </main>
      
    </div>
  )
}
export default Home;
