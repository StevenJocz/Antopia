import { Route, useLocation, useNavigate } from 'react-router-dom';
import { RoutesWithNotFound, clearLocalStorage } from '../../../utilities';
import './Home.css'
import { lazy, useEffect } from 'react';
import ColoniaRouter from '../../../components/Grupos/ColoniaRouter';
import { Publicacion } from './Publicacion';
import { Buscador } from './Buscador';
import { Noticas } from './Noticias';
import { resetUser, UserKey, TokenKey } from '../../../redux/states/user';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { Chat } from './PublicacionesAntopia';
import { SidebarGrupo, SidebarPerfil, SidebarPublicacion, SiderbarColonias, SiderbarViewPublicacion } from '../../../components/Sidebar';
import { AlimentoVivo } from './AlimentoVivo';
import { DiarioProvider } from '../../../Context/DiarioContext';
import ConfiguracionPerfil from './ConfiguracionPerfil/ConfiguracionPerfil';


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
    const sessionExp = parseInt(userState.exp);  // Reemplaza esto con el valor real de exp en tu sesión
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

  const currentPath = location.pathname;
  const isColoniaRoute = currentPath.startsWith('/Home/Colonias');
  const isColoniasRoute = currentPath.startsWith('/Home/Colonias/');
  const isPerfilRoute = currentPath.startsWith('/Home/Perfil/');
  const isPublicacionRoute = currentPath.startsWith('/Home/Publicacion/');
  const isDescubreColoniasRoute = currentPath.startsWith('/Home/Colonias/DescubreColonias');
  const isAlimentoVivoRoute = currentPath.startsWith('/Home/AlimentoVivo');
  const isCriaHormigasRoute = currentPath.startsWith('/Home/CriaHormigas');
  const isConstrucionHormiguerosRoute = currentPath.startsWith('/Home/ConstrucionHormigueros');
  const isExperimentosTecnicasRoute = currentPath.startsWith('/Home/ExperimentosTecnicas');

  let idPerfil: any = 0;
  if (isPerfilRoute) {
    const location = useLocation();
    idPerfil = location.pathname.split("/")[3];
  }

  return (
    <div className="Layout">
      <nav className="Layout-menu">
        <Nav />
      </nav>
      <aside className="Layout-sidebar-right">
        {isColoniasRoute ? (
          <SidebarGrupo />
        ) : isColoniaRoute ? (
          < SiderbarColonias />
        ) : isPerfilRoute ? (
          <DiarioProvider idPerfil={Number(idPerfil)}>
            <SidebarPerfil />
          </DiarioProvider>
        ) : isPublicacionRoute ? (
          <SiderbarViewPublicacion />
        ) : isDescubreColoniasRoute ? (
          <h1>Descubre Colonias</h1>
        ) : isAlimentoVivoRoute ? (
          <SidebarPublicacion idTipo={7} />
        ) : isCriaHormigasRoute ? (
          <SidebarPublicacion idTipo={2} />
        ) : isConstrucionHormiguerosRoute ? (
          <SidebarPublicacion idTipo={3} />
        ) : isExperimentosTecnicasRoute ? (
          <SidebarPublicacion idTipo={4} />
        ) : (
          <Sidebar />
        )}

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
          <Route path="/Publicacion/:id/*" element={<Publicacion />} />
          <Route path="/Colonias/*" element={<ColoniaRouter />} />
          <Route path="/Hashtag/:hashtag/*" element={<Hashtag />} />
          <Route path="/Buscar/*" element={<Buscador />} />
          <Route path="/Felicidades/*" element={<Noticas />} />
          <Route path="/Chat/*" element={<Chat />} />
          <Route path="/AlimentoVivo" element={<AlimentoVivo />} />
          <Route path="/Configuracion" element={<ConfiguracionPerfil />} />
        </RoutesWithNotFound>
      </main>
    </div>
  )
}
export default Home;
