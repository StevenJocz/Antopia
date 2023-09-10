import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const Inicio: React.FC = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <PublicacionesProvider idTipo={null} idPerfil={null}>
                <NuevoPost tipo={1} />
                <h2>Reciente</h2>
                <Slider idTipo={1} />
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Inicio