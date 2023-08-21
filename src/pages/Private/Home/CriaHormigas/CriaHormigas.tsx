import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const CriaHormigas = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
          mainContainer.scrollTop = 0;
        }
      }, []);
    return (
        <div>
            <PublicacionesProvider idTipo={1} idPerfil={null}>
                <NuevoPost />
                <h2>Cria de Hormigas</h2>
                <Card />
            </PublicacionesProvider>

        </div>
    )
}

export default CriaHormigas