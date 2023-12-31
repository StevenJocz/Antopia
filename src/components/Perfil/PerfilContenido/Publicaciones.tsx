import { useLocation } from "react-router-dom";
import { PublicacionesProvider } from "../../../Context/PublicacionesContext";
import Card from "../../Card/Card";
import { NuevoPost } from "../../NuevoPost";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

const Publicaciones = () => {
    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];
    const userState = useSelector((store: AppStore) => store.user);
    
    const [verNuevoPost, setVerNuevoPost] = useState(false);

    
    useEffect(() => {
        if (Number(idPerfil) === Number(userState.IdPerfil)) {
            setVerNuevoPost(true);
        } else {
            setVerNuevoPost(false);
        }
        
    }, [idPerfil, userState.IdPerfil]);

    return (
        <div>
            <PublicacionesProvider idTipo={0} idPerfil={Number(idPerfil)} idColonia={0} opcion={3} hashtag="">
                {verNuevoPost && (
                    <NuevoPost tipo={1} idColonia={0}/>
                )}
                <h2>Publicaciones</h2>
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Publicaciones;
