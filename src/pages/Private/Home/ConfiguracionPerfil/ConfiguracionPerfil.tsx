import { useState } from 'react';

import './ConfiguracionPerfil.css'
import Cuenta from './Cuenta';
import Contraseña from './Contraseña';
import Fotos from './Fotos';


const ConfiguracionPerfil = () => {
  const [numeroPaso, setnumeroPaso] = useState(1);

  const handlenumeroPaso = (numero: number) => {
    setnumeroPaso(numero);
  };



  return (
    <div className="ConfiguracionPerfil">
      <h2>Configuración</h2>
      <div className="ConfiguracionPerfil-opciones">
        <ul>
          <li className={`${numeroPaso == 1 ? "UlLinea" : ""}`} onClick={() => handlenumeroPaso(1)}>Cuenta</li>
          <li className={`${numeroPaso == 2 ? "UlLinea" : ""}`} onClick={() => handlenumeroPaso(2)}>Contraseña</li>
          <li className={`${numeroPaso == 3 ? "UlLinea" : ""}`} onClick={() => handlenumeroPaso(3)}>Foto de perfil</li>
          <li className={`${numeroPaso == 4 ? "UlLinea" : ""}`} onClick={() => handlenumeroPaso(4)}>Portada</li>
        </ul>
      </div>
      {numeroPaso === 1 && (
        <Cuenta />
      )}
      {numeroPaso === 2 && (
        <Contraseña />
      )}
      {numeroPaso === 3 && (
        <Fotos tipo={1} />
        
      )}
      {numeroPaso === 4 && (
        <Fotos tipo={2} />
      )}

    </div>
  )
}

export default ConfiguracionPerfil