import { Route, useLocation } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import { Publicaciones, Fotos, Diario } from "./PerfilContenido"
import { DiarioProvider } from "../../Context/DiarioContext";
import { PublicacionesProvider } from "../../Context/PublicacionesContext";


const RoutePerfil = () => {

    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];
    return (
        <div className="RoutePerfil">
            <PublicacionesProvider idTipo={0} idPerfil={Number(idPerfil)} idColonia={0} opcion={3} hashtag="">
                <DiarioProvider idPerfil={Number(idPerfil)}>
                    <RoutesWithNotFound>
                        <Route path="/:idPerfil/*" element={<Publicaciones />} />
                        <Route path="/:idPerfil/:nombre/Fotos" element={<Fotos />} />
                        <Route path="/:idPerfil/:nombre/Diarios" element={<Diario idPerfil={parseInt(idPerfil)} />} />
                    </RoutesWithNotFound>
                </DiarioProvider>
            </PublicacionesProvider>
        </div>
    )
}

export default RoutePerfil