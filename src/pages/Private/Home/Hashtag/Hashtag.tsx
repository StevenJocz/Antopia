import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PublicacionesProvider } from "../../../../Context/PublicacionesContext";
import Card from "../../../../components/Card/Card";

const Hashtag = () => {
    const location = useLocation();
    const [decodedHashtag, setDecodedHashtag] = useState("");

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
    }, [location]);

    // Verifica si decodedHashtag tiene un valor antes de renderizar CardHashtag
    if (!decodedHashtag) {
        return null; // O muestra un mensaje de carga o simplemente no renderiza nada
    }

    return (
        <div>
            <h2>#{decodedHashtag}</h2>
            <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={5} hashtag={decodedHashtag}>
                <Card />
            </PublicacionesProvider>
        </div>
    );
}

export default Hashtag;

