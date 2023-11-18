
import { BarraProgreso } from "../BarraProgreso"
import { Tendencias } from "../Tendencias";
import { Sugerencia } from "../Followers";
import { Recomendados } from '../Tiendas';
import './Sidebar.css'
import { TopColonias } from '../Grupos/TopColonias';



const Sidebar = () => {
    
    return (
        <div>
            <BarraProgreso />
            <div className="sidebar-content siderbar-donacion">
                <h4>Apoya a Antopia</h4>
                <p>¡Haz que nuestra pasión por las hormigas siga latiendo! Con tu apoyo, impulsamos el crecimiento y mantenimiento de nuestra comunidad.</p>
                <button>Donar ahora</button>
            </div>
            <TopColonias />
            <Tendencias />
            <Recomendados />
            <Sugerencia />
        </div>
    )
}

export default Sidebar