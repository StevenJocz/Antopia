

import { useState } from 'react';
import IniciarSesion from './IniciarSesion';
import Recordarme from './Recordarme';
import img from '../../assets/imagenes/Logoants.png'
import './Login.css'
import { Link } from 'react-router-dom';


enum ComponenteActual {
  IniciarSesion = 'IniciarSesion',
  Recordar = 'Recordar',
  Registro = 'Registro',
}

const Login = () => {
  const [componenteActual, setComponenteActual] = useState<ComponenteActual>(ComponenteActual.IniciarSesion);

  const mostrarRecordar = () => {
    setComponenteActual(ComponenteActual.Recordar);
  };

  const mostrarRegistro = () => {
    setComponenteActual(ComponenteActual.Registro);
  };

  return (
    <div className='login'>
      <div className='login__bg--Uno'></div>
      <div className='login__bg--Dos'></div>
      <div className='login__bg--Tres'></div>
      <div className='login__logo'>
        <img src={img} alt="" />
        <p>Únete a la comunidad en línea de amantes de las hormigas y descubre un paraíso utópico de pasión y conocimiento compartido.</p>
        <button><Link to="/Registro">Únete</Link></button>      
      </div>
      <div className='login__container'>
        {componenteActual === ComponenteActual.IniciarSesion && (
          <IniciarSesion mostrarRecordar={mostrarRecordar} mostrarRegistro={mostrarRegistro} />
        )}
        {componenteActual === ComponenteActual.Recordar && (
          <Recordarme mostrarIniciarSesion={() => setComponenteActual(ComponenteActual.IniciarSesion)} />
        )}
      </div>
    </div>
  );
}
export default Login;
