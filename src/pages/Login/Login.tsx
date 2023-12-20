

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
        <button><Link to="/Inicio">Ver Antopia</Link></button>
        <button className='Uniser'><Link to="/Registro">Únete</Link></button>
      </div>
      
      <div className='login__container'>
        {componenteActual === ComponenteActual.IniciarSesion && (
          <IniciarSesion mostrarRecordar={mostrarRecordar} mostrarRegistro={mostrarRegistro} />
        )}
        {componenteActual === ComponenteActual.Recordar && (
          <Recordarme mostrarIniciarSesion={() => setComponenteActual(ComponenteActual.IniciarSesion)} />
        )}
      </div>
      <div className='footernav'>
        <a href="https://about.antopia.org/es/ts" target='_blank'>Términos de servicio</a>
        <a href="https://about.antopia.org/es/tp" target='_blank'>Política de privacidad</a>
        <a href="https://about.antopia.org/es/tc" target='_blank'>Política de cookies</a>
        <a href="https://about.antopia.org" target='_blank'>Accesibilidad</a>
        <a href="https://about.antopia.org/es/ia" target='_blank'>Información de los anuncios</a>
        <a href="https://about.antopia.org" target='_blank'>Más...</a>
        <p>© 2023 Antopia. <a href="" className='desarrollado'>Desarrollado por Steven Jocz</a></p>
      </div>
    </div>
  );
}
export default Login;
