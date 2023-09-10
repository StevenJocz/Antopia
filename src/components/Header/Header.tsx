import { IonIcon } from '@ionic/react';
import { notifications, chatbubble, searchOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Header.css'
import { useRef, useState } from 'react';
import Buscardor from './Buscador/Buscardor';
import Chat from './Chat/Chat';
import Notificaciones from './Notificaciones/Notificaciones';
import PerfilAcciones from './PerfilAcciones/PerfilAcciones';

const Header = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [miPerfil, setMiPerfil] = useState(false);
    const [verChat, setChat] = useState(false);
    const [verBuscardor, setBuscardor] = useState(false);
    const [verNotificaciones, setNotificaciones] = useState(false);
    const [inputBuscardor, setInputBuscardor] = useState('');

    const handleMiPerfil = () => {

        setMiPerfil(!miPerfil);
    };

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        setInputBuscardor(input.value);
        setBuscardor(!verBuscardor);
    }

    const divMiPerfil = useRef<HTMLDivElement>(null);
    const divBuscardor = useRef<HTMLDivElement>(null);
    const divNotificaciones = useRef<HTMLDivElement>(null);
    const divChat = useRef<HTMLDivElement>(null);

    const closeOpenMenus = (event: MouseEvent) => {
        if (divMiPerfil.current && miPerfil && !((divMiPerfil.current as HTMLDivElement).contains(event.target as Node))) {
            setMiPerfil(false);
        }
        if (divBuscardor.current && verBuscardor && !((divBuscardor.current as HTMLDivElement).contains(event.target as Node))) {
            setBuscardor(false);
        }
        if (divNotificaciones.current && verNotificaciones && !((divNotificaciones.current as HTMLDivElement).contains(event.target as Node))) {
            setNotificaciones(false);
        }
        if (divChat.current && verChat && !((divChat.current as HTMLDivElement).contains(event.target as Node))) {
            setChat(false);
        }
    };
    document.addEventListener('mousedown', closeOpenMenus)

    const handleChat = () => {
        setChat(!verChat);
    }

    const handleNotificaciones = () => {
        setNotificaciones(!verNotificaciones);
    }


    return (
        <div className='Header'>
            <div className='Header-buscador'>
                <input
                    type="text"
                    placeholder='Buscar en Antopia'
                    onChange={handleInputValue}
                    
                />
                <IonIcon className='Header-buscador-icono' icon={searchOutline} />

            </div>
            <div className='Header-menu'>
                <div className='Header-menu-contect' onClick={handleChat}>
                    <IonIcon className='Header-menu-icono' icon={chatbubble} />
                </div>
                <div className='Header-menu-contect' onClick={handleNotificaciones}>
                    <IonIcon className='Header-menu-icono' icon={notifications} />
                </div>
                <img src={userState.ImagenPerfil} alt="" onClick={handleMiPerfil} />

            </div>
            <div className={`Chat-Contenedor ${verChat ? "active" : ""}`} ref={divChat} >
                {verChat && (
                    <Chat />
                )}
            </div>
            <div className={`Buscardor-Contenedor ${verBuscardor ? "active" : ""}`} ref={divBuscardor} >
                {verBuscardor && (
                    <Buscardor texto={inputBuscardor} />
                )}
            </div>

            <div className={`Notificaciones-Contenedor ${verNotificaciones ? "active" : ""}`} ref={divNotificaciones} >
                {verNotificaciones && (
                    <Notificaciones />
                )}
            </div>
            <div className={`MiPerfil ${miPerfil ? "active" : ""}`} ref={divMiPerfil} >
                {miPerfil && <PerfilAcciones />}
            </div>

        </div>
    )
}

export default Header