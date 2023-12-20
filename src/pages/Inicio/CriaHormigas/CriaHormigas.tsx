import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../Context/PublicacionesContext';
import { Slider } from '../../../components/Slider';
import { Helmet } from 'react-helmet';

const Card = lazy(() => import('../../../components/Card/Card'));

const CriaHormigas = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <Helmet>
                <title>Antopia | Cria de Hormigas</title>
                <meta name="description" content="Cria de Hormigas" />
                <meta property="og:title" content="Cria de Hormigas" />
                <meta property="og:description" content="Cria de Hormigas" />
            </Helmet>
            <PublicacionesProvider idTipo={2} idPerfil={0} idColonia={0} opcion={2} hashtag="">
                <Slider idTipo={1} />
                <h2>Cria de Hormigas</h2>
                <Card />
            </PublicacionesProvider>

        </div>
    )
}

export default CriaHormigas