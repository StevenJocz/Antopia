import { useLocation } from "react-router-dom";
import Helmet from 'react-helmet';
import { PublicacionesProvider } from "../../../../Context/PublicacionesContext"
import Card from "../../../../components/Card/Card"
import { getPublicaciones } from "../../../../services";
import { useEffect, useState } from "react";
import { Publicacion } from "../../../../models";


const Publicaciones = () => {
    const location = useLocation();
    const idPublicacion = location.pathname.split("/")[3];
    const [publicacion, setPublicacion] = useState<Publicacion[] | null>(null);


    useEffect(() => {
        async function fetchPerfil() {
            try {
                const resultado = await getPublicaciones(0, 6, parseInt(idPublicacion), "0");
                setPublicacion(resultado);

            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }
        fetchPerfil();
    }, [idPublicacion]);


    const primeraPublicacion = publicacion && publicacion.length > 0 ? publicacion[0] : null;

    // Definir los valores de Open Graph en función de la primera publicación
    const ogTitle = primeraPublicacion ? primeraPublicacion.Titulo : 'Título de Open Graph de la Publicación';
    const ogDescription = primeraPublicacion ? primeraPublicacion.Contenido : 'Descripción de Open Graph de la Publicación';
    const ogImage = primeraPublicacion ? primeraPublicacion.ImagenesPublicacion : 'URL_de_la_imagen.jpg';
    const ogUrl = window.location.href; // URL actual

    return (
        <div>
            <Helmet>
                <title>Título de la página</title>
                <meta name="description" content="Descripción de la página" />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage[0]} />
                <meta property="og:url" content={ogUrl} />
            </Helmet>
            <PublicacionesProvider idTipo={0} idPerfil={0} idColonia={parseInt(idPublicacion)} opcion={6} hashtag="0">
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Publicaciones