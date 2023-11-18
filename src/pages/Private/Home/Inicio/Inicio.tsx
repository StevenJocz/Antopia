import { lazy, useEffect } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';
import { Helmet } from 'react-helmet';
import { BarraProgreso } from '../../../../components/BarraProgreso';

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
            <Helmet>
                <title>Antopia </title>
                <meta name="description" content="Antopia" />
                <meta property="og:title" content="Antopia" />
                <meta property="og:description" content="Antopia" />
            </Helmet>
            <PublicacionesProvider idTipo={1} idPerfil={0} idColonia={0} opcion={1} hashtag="">
                <div className='progreso-inicio'>
                <BarraProgreso/>
                </div>
                <NuevoPost tipo={1} idColonia={0} />
                <h2>Reciente</h2>
                <Slider idTipo={1} />
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Inicio