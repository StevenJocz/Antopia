import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { BarraProgreso } from "../BarraProgreso"
import { Tendencias } from "../Tendencias";
import { Sugerencia } from "../Followers";

import './Sidebar.css'
import { Recomendados } from '../Tiendas';


const Sidebar = () => {
    const userState = useSelector((store: AppStore) => store.user);

    return (
        <div>
            <div className="sidebar-content siderbar-donacion">
                <h4>Apoya a Antopia</h4>
                <p>¡Haz que nuestra pasión por las hormigas siga latiendo! Con tu apoyo, impulsamos el crecimiento y mantenimiento de nuestra comunidad.</p>
                <button>Donar ahora</button>
            </div>
            <BarraProgreso percent={50} level={userState.Level} />
            <Tendencias/>
            <Recomendados/>
            <Sugerencia/>
        </div>
    )
}

export default Sidebar