import { lazy, useEffect, useMemo, useState } from 'react';
import { PublicacionesProvider } from '../../../../Context/PublicacionesContext';
import { Slider } from '../../../../components/Slider';
import { Helmet } from 'react-helmet';
import { Barnner } from '../../../../components/Tiendas';

const Card = lazy(() => import('../../../../components/Card/Card'));
const NuevoPost = lazy(() => import('../../../../components/NuevoPost/NuevoPost'));

const Inicio: React.FC = () => {
    const [tipo, setTipo] = useState(1);
    const [key, setKey] = useState(0);
    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);

    const handdleTipo = (tipo: number) => {

        setTipo(tipo);
        setKey(key + 1);
    };

    const providerKey = useMemo(
        () => ({
            idTipo: tipo,
            idPerfil: 0,
            idColonia: 0,
            opcion: tipo,
            hashtag: '',
        }),
        [tipo]
    );
    return (
        <div>
            <Helmet>
                <title>Antopia </title>
                <meta name="description" content="Antopia" />
                <meta property="og:title" content="Antopia" />
                <meta property="og:description" content="Antopia" />
            </Helmet>
            <PublicacionesProvider key={key} {...providerKey} >
                <NuevoPost tipo={1} idColonia={0} />
                <h2>Reciente</h2>
                <Slider idTipo={1} />
                <ul className='MenuInicio'>
                    <li className={tipo == 1 ? 'UlLinea' : ''} onClick={() => handdleTipo(1)}>Para ti</li>
                    <li className={tipo == 7 ? 'UlLinea' : ''} onClick={() => handdleTipo(7)}>Siguiendo</li>
                </ul>
                <Barnner/>
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Inicio