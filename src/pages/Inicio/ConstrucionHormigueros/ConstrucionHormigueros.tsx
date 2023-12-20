import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../Context/PublicacionesContext';
import { Slider } from '../../../components/Slider';
import { Helmet } from 'react-helmet';

const Card = lazy(() => import('../../../components/Card/Card'));

const ConstrucionHormigueros = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <Helmet>
                <title>Antopia | Construcción hormigueros</title>
                <meta name="description" content="Construcción hormigueros" />
                <meta property="og:title" content="Construcción hormigueros" />
                <meta property="og:description" content="Construcción hormigueros" />
            </Helmet>
            <PublicacionesProvider idTipo={3} idPerfil={0} idColonia={0} opcion={2} hashtag="">
                <Slider idTipo={1} />
                <h2>Construcción hormigueros</h2>
                <Card />
            </PublicacionesProvider>

        </div>
    )
}

export default ConstrucionHormigueros