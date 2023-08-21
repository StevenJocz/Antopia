import { IonIcon } from '@ionic/react';
import { notifications, chatbubble, searchOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './Header.css'
import {useState } from 'react';
import Buscardor from './Buscador/Buscardor';
import Chat from './Chat/Chat';
import Notificaciones from './Notificaciones/Notificaciones';

const Header = () => {
    const userState = useSelector((store: AppStore) => store.user);

    const [verChat, setChat] = useState(false);
    const [verBuscardor, setBuscardor] = useState(false);
    const [verNotificaciones, setNotificaciones] = useState(false);

    const handleChat = () => {
        setChat(!verChat);
    }

    const handleBuscardor = () => {
        setBuscardor(!verBuscardor);
    }

    const handleNotificaciones = () => {
        setNotificaciones(!verNotificaciones);
    }

    return (
        <div className='Header'>
            <div className='Header-buscador'>
                <input type="text" placeholder='Buscar en Antopia' onClick={handleBuscardor} />
                <IonIcon className='Header-buscador-icono' icon={searchOutline} />

            </div>
            <div className='Header-menu'>
                <div className='Header-menu-contect' onClick={handleChat}>
                    <IonIcon className='Header-menu-icono' icon={chatbubble} />
                </div>
                <div className='Header-menu-contect' onClick={handleNotificaciones}>
                    <IonIcon className='Header-menu-icono' icon={notifications} />
                </div>
                <img src={userState.ImagenPerfil} alt="" />
                {verChat && (
                    <Chat />
                )}
            </div>
            {verBuscardor && (
                <Buscardor />
            )}

            {verNotificaciones && (
                <Notificaciones />
            )}

        </div>
    )
}

export default Header