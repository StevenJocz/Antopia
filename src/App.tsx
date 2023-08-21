import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import { AuthGuard, RoleGuard } from './guards';
import { PrivateRoutes, PublicRoutes, Roles } from './models';
import store from './redux/store';
import { RoutesWithNotFound } from './utilities';
import { Home } from './pages/Private';

const Login = lazy(() => import('./pages/Login/Login'));
const Private = lazy(() => import('./pages/Private/Private'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path="/Dashboard" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={PublicRoutes.Home} element={<Login />} />
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
      </Suspense>
    </div>
  );
}

export default App;
