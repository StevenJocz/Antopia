import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PublicacionesProvider } from "../../../../Context/PublicacionesContext";
import Card from "../../../../components/Card/Card";
import { Helmet } from "react-helmet";
import { NuevoPost } from "../../../../components/NuevoPost";
import { Barnner } from "../../../../components/Tiendas";

const Hashtag = () => {
    const location = useLocation();
    const [decodedHashtag, setDecodedHashtag] = useState("");
    const [forceRerender, setForceRerender] = useState(0);

    useEffect(() => {
        const mainContainer = document.getElementById('Layout-main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);

    useEffect(() => {
        const encodedHashtag = location.pathname.split("/")[3];
        const decodedHashtag = decodeURIComponent(encodedHashtag);
        setDecodedHashtag(decodedHashtag);
        setForceRerender(prev => prev + 1); // Cambia la clave para forzar la renderización
    }, [location]);

    return (
        <div key={forceRerender}>
            <Helmet>
                <title>Antopia | #{decodedHashtag}</title>
                <meta name="description" content={decodedHashtag} />
                <meta property="og:title" content={decodedHashtag} />
                <meta property="og:description" content={decodedHashtag} />
            </Helmet>
          
            <h2>#{decodedHashtag}</h2>
            <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={5} hashtag={decodedHashtag}>
                <NuevoPost tipo={1} idColonia={0} />
                <Barnner/>
                <Card />
            </PublicacionesProvider>
        </div>
    );
}

export default Hashtag;
