
import { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import { AuthGuard, RoleGuard } from './guards';
import { PrivateRoutes, PublicRoutes, Roles } from './models';
import store from './redux/store';
import { RoutesWithNotFound } from './utilities';
import { Home } from './pages/Private';
import { PropagateLoader } from 'react-spinners';
import Registro from './pages/Login/Registro';


const Login = lazy(() => import('./pages/Login/Login'));
const Private = lazy(() => import('./pages/Private/Private'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer un temporizador para 3 segundos
    const timer = setTimeout(() => {
      // Actualizar el estado para indicar que se ha completado el tiempo de espera
      setIsLoading(false);
    }, 2000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App">

      <Suspense>
        {isLoading ? (
          <div className='PropagateLoader'>
            <PropagateLoader color="#fff" speedMultiplier={1} size={30} />
          </div>
        ) : (
          <Provider store={store}>
            <BrowserRouter>
              <RoutesWithNotFound>
                <Route path="/Dashboard" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                <Route path={PublicRoutes.Home} element={<Login />} />
                <Route path={PublicRoutes.Registro} element={<Registro />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                    <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                  </Route>
                  <Route element={<RoleGuard rol={Roles.USER} />}>
                    <Route path={`${PrivateRoutes.User}/*`} element={<Home />} />
                  </Route>
                </Route>
              </RoutesWithNotFound>
            </BrowserRouter>
          </Provider>
        )}
      </Suspense>
    </div>
  );
}

export default App;
