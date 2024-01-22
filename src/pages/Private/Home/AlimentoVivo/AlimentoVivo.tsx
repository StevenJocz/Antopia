import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';
import { Helmet } from 'react-helmet';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const AlimentoVivo = () => {
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);
    return (
        <div>
            <Helmet>
                <title>Antopia | Alimento Vivo </title>
                <meta name="description" content="Descubre la nutrición esencial para tus hormigas con nuestro alimento vivo de alta calidad. Explora una variedad de opciones, desde insectos y larvas hasta otros nutrientes naturales que proporcionan a tus hormigas una dieta equilibrada y saludable. Asegura el bienestar de tus colonias y observa cómo prosperan con nuestro exclusivo surtido de alimentos vivos para hormigas." />
                <meta property="og:title" content="Alimento Vivo" />
                <meta property="og:description" content="Descubre la nutrición esencial para tus hormigas con nuestro alimento vivo de alta calidad. Explora una variedad de opciones, desde insectos y larvas hasta otros nutrientes naturales que proporcionan a tus hormigas una dieta equilibrada y saludable. Asegura el bienestar de tus colonias y observa cómo prosperan con nuestro exclusivo surtido de alimentos vivos para hormigas." />
            </Helmet>
            <PublicacionesProvider idTipo={7} idPerfil={0} idColonia={0} opcion={2} hashtag="">
                <NuevoPost tipo={7} idColonia={0} />
                <h2>Alimento Vivo</h2>
                <Slider idTipo={1} />
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default AlimentoVivo