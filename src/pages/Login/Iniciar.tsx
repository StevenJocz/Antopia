import { useState } from 'react';
import IniciarSesion from './IniciarSesion';
import { Recordarme } from '.';
import img from '../../assets/imagenes/logi_image.png'
import './Login.css'


enum ComponenteActual {
    IniciarSesion = 'IniciarSesion',
    Recordar = 'Recordar',
    Registro = 'Registro',
}

const Iniciar = () => {
    const [componenteActual, setComponenteActual] = useState<ComponenteActual>(ComponenteActual.IniciarSesion);

    const mostrarRecordar = () => {
        setComponenteActual(ComponenteActual.Recordar);
    };

    const mostrarRegistro = () => {
        setComponenteActual(ComponenteActual.Registro);
    };
    return (
        <div className='login'>
            <div className='login__logo'>
                <img src={img} alt="" />
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

export default Iniciar