import { useState } from "react";
import { IonIcon } from '@ionic/react';
import { notifications, search, filter, home } from 'ionicons/icons';
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import './TopBar.css';
import { Link } from "react-router-dom";

interface Props {
    handleVerMenu: () => void;
    handleNotificaciones: () => void;
    handleMiPerfil: () => void;
    notificaciones: boolean
}

const TopBar: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [activeNav, setActiveNav] = useState('#home');

    return (
        <nav className="TopBar">
            <Link to='/Home' onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}> <IonIcon className='' icon={home} /> </Link>
            <Link to='/Home/Buscar' onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><IonIcon className='' icon={search} /></Link>
            <a onClick={props.handleMiPerfil}  ><img src={userState.ImagenPerfil} alt="" /></a>
            <a onClick={props.handleNotificaciones} className={activeNav === '#portfolio' ? 'active' : ' notifi-a'}><IonIcon className='' icon={notifications} />
                {props.notificaciones && (
                    <span></span>
                )}

            </a>
            <a onClick={props.handleVerMenu} className={activeNav === '#contact' ? 'active' : ''}><IonIcon className='' icon={filter} /></a>

        </nav>
    )
}

export default TopBar