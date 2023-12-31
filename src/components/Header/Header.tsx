import { IonIcon } from '@ionic/react';
import { notifications, search, filter, home, chatbubble } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Header.css'
import { useEffect, useRef, useState } from 'react';
import Chat from '../Chat/Chat';
import Notificaciones from './Notificaciones/Notificaciones';
import PerfilAcciones from './PerfilAcciones/PerfilAcciones';
import { NavResponsive } from '../Nav';
import { Link } from 'react-router-dom';
import { getHayNotificacion } from '../../services';
import logo from '../../assets/imagenes/Logoants.png'
import { TopBar } from '../TopBar';
import io from 'socket.io-client';
import { services } from '../../models';


const Header = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [miPerfil, setMiPerfil] = useState(false);
    const [verChat, setChat] = useState(false);
    const [verBuscardor, setBuscardor] = useState(false);
    const [verNotificaciones, setVerNotificaciones] = useState(false);
    const [notificaciones, setNotificaciones] = useState(false);
    const [verMenu, setVerMenu] = useState(false);
    const [cantidadMensajes, setCantidadMensajes] = useState(0);
    const baseUrl = services.socket
    const socket = io(baseUrl);


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
            setVerNotificaciones(false);
        }
        // if (divChat.current && verChat && !((divChat.current as HTMLDivElement).contains(event.target as Node))) {
        //     setChat(false);
        // }
    };
    document.addEventListener('mousedown', closeOpenMenus)

    const handleChat = () => {
        
        socket.emit('user_disconnected', userState.IdPerfil);
        socket.emit('user_connected', userState.IdPerfil);
        socket.on('mensajes_nuevos', (data) => {
            setCantidadMensajes(data);
        });
        setChat(!verChat);
    }

    useEffect(() => {

        consultarNotificacion()
        const intervalId = setInterval(consultarNotificacion, 60000); // cada 3 minutos

        socket.emit('user_connected', userState.IdPerfil);

        socket.on('mensajes_nuevos', (data) => {
            setCantidadMensajes(data);
        });

        return () => {
            socket.emit('user_disconnected', userState.IdPerfil);
            socket.disconnect();
            clearInterval(intervalId);
        };

    }, []);


    const consultarNotificacion = async () => {
        try {
            const resultado = await getHayNotificacion(userState.IdPerfil);
            setNotificaciones(resultado.resultado);

        } catch (error) {

        }
    };

    const handleNotificaciones = () => {
        setNotificaciones(false);
        setVerNotificaciones(!verNotificaciones);
    }

    const handleVerMenu = () => {
        setVerMenu(!verMenu);
    }

    return (
        <div className='Header'>
            <div className='Header-logo'>
                <img src={logo} alt="" />
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
                <div className='Header-menu-contect' >
                    <Link to='/Home/Buscar'>
                        <IonIcon className='Header-menu-icono' icon={search} />
                    </Link>

                </div>
                <div className='Header-menu-contect Header-menu-contect-chat' onClick={handleChat}>
                    <IonIcon className='Header-menu-icono' icon={chatbubble} />
                    {cantidadMensajes > 0 && (
                        <span>{cantidadMensajes}</span>
                    )}
                </div>
                <div className='Header-menu-contect Header-menu-contect-notificacion' onClick={handleNotificaciones}>
                    <IonIcon className='Header-menu-icono' icon={notifications} />
                    {notificaciones && (
                        <span></span>
                    )}

                </div>

                <img src={userState.ImagenPerfil} alt="" onClick={handleMiPerfil} />

            </div>
            <div className={`Chat-Contenedor ${verChat ? "active" : ""}`} ref={divChat} >
                {verChat && (
                    <Chat haddleVerChat={handleChat} />
                )}
            </div>
            <div className={`Notificaciones-Contenedor ${verNotificaciones ? "active" : ""}`} ref={divNotificaciones} >
                {verNotificaciones && (
                    <Notificaciones mostrarNotificaciones={() => setVerNotificaciones(false)} />
                )}
            </div>
            <div className={`MiPerfil ${miPerfil ? "active" : ""}`} ref={divMiPerfil} >
                {miPerfil && <PerfilAcciones handleMiPerfil={() => setMiPerfil(false)} />}
            </div>
            {verMenu && <NavResponsive handleVerMenu={() => setVerMenu(false)} />}
            <TopBar
                handleVerMenu={() => setVerMenu(true)}
                handleNotificaciones={() => handleNotificaciones()}
                handleMiPerfil={() => setMiPerfil(true)}
                notificaciones={notificaciones}
            />
        </div>
    )
}

export default Header