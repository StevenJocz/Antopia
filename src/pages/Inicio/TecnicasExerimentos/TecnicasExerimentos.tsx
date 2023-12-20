import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../Context/PublicacionesContext';
import { Slider } from '../../../components/Slider';
import { Helmet } from 'react-helmet';

const Card = lazy(() => import('../../../components/Card/Card'));

const TecnicasExerimentos = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <Helmet>
                <title>Antopia | Experimentos y técnicas </title>
                <meta name="description" content="Experimentos y técnicas" />
                <meta property="og:title" content="Experimentos y técnicas" />
                <meta property="og:description" content="Experimentos y técnicas" />
            </Helmet>
            <PublicacionesProvider idTipo={4} idPerfil={0} idColonia={0} opcion={2} hashtag="">
                <Slider idTipo={1} />
                <h2>Experimentos y técnicas</h2>
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default TecnicasExerimentos