import { useEffect, useState } from "react";
import { IonIcon } from '@ionic/react';
import { notifications, search, menuOutline, home, chatbubble } from 'ionicons/icons';
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import './TopBar.css';
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import io from 'socket.io-client';
import { services } from "../../models";


interface Props {
    handleVerMenu: () => void;
    handleNotificaciones: () => void;
    handleMiPerfil: () => void;
    notificaciones: boolean
}

const TopBar: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [activeNav, setActiveNav] = useState('#home');
    const [verChat, setChat] = useState(false);
    const [cantidadMensajes, setCantidadMensajes] = useState(0);
    const baseUrl = services.socket
    const socket = io(baseUrl);

    const handleChat = () => {
        
        socket.emit('user_disconnected', userState.IdPerfil);
        socket.emit('user_connected', userState.IdPerfil);
        socket.on('mensajes_nuevos', (data) => {
            setCantidadMensajes(data);
        });
        setChat(!verChat);
    }

    useEffect(() => {

        socket.emit('user_connected', userState.IdPerfil);

        socket.on('mensajes_nuevos', (data) => {
            setCantidadMensajes(data);
        });

        return () => {
            socket.emit('user_disconnected', userState.IdPerfil);
            socket.disconnect();
        };

    }, []);
    return (
        <>
            <nav className="TopBar">
            <a onClick={props.handleVerMenu} className={activeNav === '#contact' ? 'active' : ''}><IonIcon className='' icon={menuOutline} /></a>
                <Link to='/Home' onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}> <IonIcon className='' icon={home} /> </Link>
               
                <Link to='/Home/Buscar' onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><IonIcon className='' icon={search} /></Link>
                
                <a onClick={props.handleNotificaciones} className={activeNav === '#portfolio' ? 'active' : ' notifi-a'}><IonIcon className='' icon={notifications} />
                    {props.notificaciones && (
                        <span></span>
                    )}
                </a>
                <a onClick={handleChat} className="TopBar-menu-icono-chat"><IonIcon className=' ' icon={chatbubble} />
                    {cantidadMensajes > 0 && (
                        <span>{cantidadMensajes}</span>
                    )}
                </a>
                <a onClick={props.handleMiPerfil} ><img src={userState.ImagenPerfil} alt="" /></a>
            </nav>
            {verChat && (
                <Chat haddleVerChat={() => setChat(false)} />
            )}
        </>
    )
}

export default TopBar