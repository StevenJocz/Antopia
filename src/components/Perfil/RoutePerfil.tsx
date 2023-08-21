import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import { Publicaciones, Fotos, Diario} from "./PerfilContenido"
import { DiarioProvider } from "../../Context/DiarioContext";



const RoutePerfil = () => {
    return (
        <div className="RoutePerfil">
            <DiarioProvider>
                <RoutesWithNotFound>
                    <Route path="/:idPerfil/*" element={<Publicaciones />} />
                    <Route path="/:idPerfil/:nombre/Fotos" element={<Fotos />} />
                    <Route path="/:idPerfil/:nombre/Diarios" element={<Diario />} />
                    <Route path="/:idPerfil/:nombre/D" element={<div>Otro</div>} />
                </RoutesWithNotFound>
            </DiarioProvider>
        </div>
    )
}

export default RoutePerfil