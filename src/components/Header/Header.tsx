import { IonIcon } from '@ionic/react';
import { notifications, chatbubble, search, filter, home } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Header.css'
import { useRef, useState } from 'react';
import Buscardor from './Buscador/Buscardor';
import Chat from './Chat/Chat';
import Notificaciones from './Notificaciones/Notificaciones';
import PerfilAcciones from './PerfilAcciones/PerfilAcciones';
import { NavResponsive } from '../Nav';
import { Link } from 'react-router-dom';
import logo from '../../assets/imagenes/Logoants.png'

const Header = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [miPerfil, setMiPerfil] = useState(false);
    const [verChat, setChat] = useState(false);
    const [verBuscardor, setBuscardor] = useState(false);
    const [verNotificaciones, setNotificaciones] = useState(false);
    const [verMenu, setVerMenu] = useState(false);

    const handleMiPerfil = () => {
        setMiPerfil(!miPerfil);
    };

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

    const handleVerBuscardor_ = () => {
        setBuscardor(!verBuscardor);
    }

    const handleVerMenu = () => {
        setVerMenu(!verMenu);
    }

    return (
        <div className='Header'>
            <div className='Header-logo'>
                <img  src={logo} alt="" />
            </div>
            
            <div className='Header-menu'>
                <div className='Header-menu-contect hamburg' onClick={handleVerMenu}>
                    <IonIcon className='Header-menu-icono' icon={filter} />
                </div>
                <div className='Header-menu-contect hamburg'>
                    <Link to='/Home'>
                        <IonIcon className='Header-menu-icono' icon={home} />
                    </Link>
                </div>
                <div className='Header-menu-contect' onClick={handleVerBuscardor_}>
                    <IonIcon className='Header-menu-icono' icon={search} />
                </div>
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
                    <Buscardor handleVerBuscardor={() => setBuscardor(false)} />
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
            {verMenu && <NavResponsive handleVerMenu={() => setVerMenu(false)} />}

        </div>
    )
}

export default Header