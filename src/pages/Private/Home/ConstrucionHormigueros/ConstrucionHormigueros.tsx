import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const ConstrucionHormigueros = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
          mainContainer.scrollTop = 0;
        }
      }, []);
    return (
        <div>
            <PublicacionesProvider idTipo={2} idPerfil={null}>
                <NuevoPost />
                <h2>Construcción hormigueros</h2>
                <Card />
            </PublicacionesProvider>

        </div>
    )
}

export default ConstrucionHormigueros