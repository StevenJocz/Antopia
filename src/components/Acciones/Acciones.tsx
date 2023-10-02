import './Acciones.css'
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoWhatsapp, closeCircleOutline, shareOutline, linkOutline } from 'ionicons/icons';
import { useState } from 'react';

interface Props {
    mostrarAcciones: () => void;
    titulo: string;
    idPublicacion: number;
}

const Acciones: React.FC<Props> = (props) => {
    const [copiado, setCopiado] = useState(false);
    const [compartir, setcompartir] = useState(false);

    const tituloCodificado = props.titulo.replace(/\s+/g, '').replace(/[^\w\s-]/g, '');
    const urlACopiar = `https://antopia.site/Home/Publicacion/${props.idPublicacion}/${tituloCodificado}`; // Reemplaza con tu URL

    const copiarAlPortapapeles = () => {
        navigator.clipboard.writeText(urlACopiar).then(() => {
            setCopiado(true);
            setTimeout(() => {
                setCopiado(false); // Después de 3 segundos, ocultar el mensaje
            }, 3000); // 3000 milisegundos = 3 segundos
        }).catch((error) => {
            console.error('Error al copiar al portapapeles: ', error);
        });
    };

    const toggleComentarios = () => {
        setcompartir(!compartir)
    };

    return (
        <div className='Acciones'>
            <div className='Acciones_cerrar'>
                <IonIcon className='Icono-cerrar' onClick={() => props.mostrarAcciones()} icon={closeCircleOutline} />
            </div>
            <span onClick={copiarAlPortapapeles}> <IonIcon icon={linkOutline} className='Acciones-icon' />  Copiar enlace</span>

            <span onClick={toggleComentarios}> <IonIcon icon={shareOutline} className='Acciones-icon' />  Compartir publicación...</span>
            {copiado && <p>Copiado al portapapeles.</p>}
            {compartir &&
                <div className='Acciones-compartir'>
                    <IonIcon icon={logoFacebook} className='Acciones-icon-facebook Acciones-icon-compartir' />

                    <a href={`whatsapp://send?text=${urlACopiar}`}><IonIcon icon={logoWhatsapp} className='Acciones-icon-whatsapp Acciones-icon-compartir' /></a>
                </div>
            }
        </div>
    )
}

export default Acciones