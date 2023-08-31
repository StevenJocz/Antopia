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
            <PublicacionesProvider idTipo={null} idPerfil={Number(idPerfil)}>
                {verNuevoPost && (
                    <NuevoPost />
                )}
                <h2>Publicaciones</h2>
                <Card idTipo={null} idPerfil={Number(idPerfil)}/>
            </PublicacionesProvider>
        </div>
    )
}

export default Publicaciones;
