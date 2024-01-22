import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';
import { Helmet } from 'react-helmet';

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
            <Helmet>
                <title>Antopia | Experimentos y técnicas </title>
                <meta name="description" content="Explora el fascinante mundo de las hormigas a través de emocionantes experimentos y técnicas. Descubre cómo estas increíbles criaturas trabajan juntas, se comunican y resuelven problemas. Sumérgete en el estudio de su comportamiento social y aprende sobre las últimas investigaciones en el fascinante reino de las hormigas." />
                <meta property="og:title" content="Experimentos y técnicas" />
                <meta property="og:description" content="Explora el fascinante mundo de las hormigas a través de emocionantes experimentos y técnicas. Descubre cómo estas increíbles criaturas trabajan juntas, se comunican y resuelven problemas. Sumérgete en el estudio de su comportamiento social y aprende sobre las últimas investigaciones en el fascinante reino de las hormigas." />
            </Helmet>
            <PublicacionesProvider idTipo={4} idPerfil={0} idColonia={0} opcion={2} hashtag="">
                <NuevoPost tipo={4} idColonia={0}/>
                <h2>Experimentos y técnicas</h2>
                <Slider idTipo={1} />
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default TecnicasExerimentos