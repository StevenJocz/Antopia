import { Route, useLocation } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import { Publicaciones, Fotos, Diario } from "./PerfilContenido"
import { DiarioProvider } from "../../Context/DiarioContext";


const RoutePerfil = () => {

    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];
    return (
        <div className="RoutePerfil">
                <DiarioProvider>
                    <RoutesWithNotFound>
                        <Route path="/:idPerfil/*" element={<Publicaciones />} />
                        <Route path="/:idPerfil/:nombre/Fotos" element={<Fotos />} />
                        <Route path="/:idPerfil/:nombre/Diarios" element={<Diario idPerfil={parseInt(idPerfil)}/>} />
                        <Route path="/:idPerfil/:nombre/D" element={<div>Otro</div>} />
                    </RoutesWithNotFound>
                </DiarioProvider>
        </div>
    )
}

export default RoutePerfil