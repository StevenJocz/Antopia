
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import {  UserKey } from '../../redux/states/user';
import { clearLocalStorage } from '../../utilities';
import { IonIcon } from '@ionic/react';
import {exitOutline } from 'ionicons/icons';

function Logout() {
  const navigate = useNavigate();
  const logOut = () => {
    clearLocalStorage(UserKey);
    navigate(PublicRoutes.Home, { replace: true });
  };
  return (
    <div className='MiPerfil_Contenido_text' onClick={logOut}>
      <IonIcon icon={exitOutline} />
      <h5>Cerror sesión</h5>
    </div>
  );


}
export default Logout;
