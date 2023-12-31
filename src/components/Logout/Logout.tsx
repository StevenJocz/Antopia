
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { PublicRoutes } from '../../models';
import {resetUser,  UserKey, TokenKey } from '../../redux/states/user';
import { clearLocalStorage } from '../../utilities';
import { IonIcon } from '@ionic/react';
import {exitOutline } from 'ionicons/icons';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logOut = () => {
    clearLocalStorage(UserKey);
    clearLocalStorage(TokenKey);
    dispatch(resetUser());
    navigate('/', { replace: true });
    //navigate(PublicRoutes.Home, { replace: true });
  };
  return (
    <div className='MiPerfil_Contenido_text' onClick={logOut}>
      <IonIcon icon={exitOutline} />
      <h5>Cerrar sesión</h5>
    </div>
  );


}
export default Logout;
