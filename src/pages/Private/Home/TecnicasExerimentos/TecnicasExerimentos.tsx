import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const TecnicasExerimentos = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <PublicacionesProvider idTipo={4} idPerfil={null}>
                <NuevoPost tipo={4}/>
                <h2>Experimentos y técnicas</h2>
                <Slider idTipo={1} />
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default TecnicasExerimentos