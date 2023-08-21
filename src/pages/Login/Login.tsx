import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, Roles } from '../../models';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { getMorty } from '../../services';
import { clearLocalStorage } from '../../utilities';
import img from '../../assets/imagenes/logi_image.png'
import logo from '../../assets/imagenes/hormigaLogo.png'
import './Login.css'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.Home}`, { replace: true });
  }, []);



  const login = async () => {
    try {
      const result = await getMorty();
      const userRole = Roles.USER;

      dispatch(createUser({ ...result, rol: userRole }));

      if (userRole === Roles.USER) {
        navigate(`/${PrivateRoutes.User}`, { replace: true });

      } else {
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
      }
    } catch (error) { }
  };
  
  return (
    <div className='login'>
      <div className='login__logo'>
        <img src={img} alt="" />
      </div>
      <div className='login__container'>
        <div className='login__container__title'>
          <img src={logo} alt="" />
          <h1>Inicie sesión para comenzar</h1>
        </div>
        <div className='login__container__input'>
          <div className="login__container__group">
            <input type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
          </div>
          <div className="login__container__group">
            <input type="password" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Contraseña</label>
          </div>
          <a href="#" className='olvido-contrseña'>¿Olvidé su contraseña?</a>
          
        </div>
        <button onClick={login}>Continuar</button>
        <a href="" className='Crear-cuenta'>¿No tienes una cuenta? <span> Únete</span> </a>
      </div>
    </div>
  );
}
export default Login;
