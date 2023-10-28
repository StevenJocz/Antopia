
import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../../utilities"
import { MiColonia } from ".."
import { AboutColonia } from "./AboutColonia"
import { Publicaciones } from "./Publicaciones"
import { Colonia } from "../../../models";
import { Imagenes } from "./Imagenes"

interface Props {
    grupo: Colonia | null;
}

export const MicoloniaRouter : React.FC<Props> = (props) => {
    return (
        <div className="MicoloniaRouter">
            <RoutesWithNotFound>
                <Route path="/:id/:nombre/*" element={<MiColonia />} />
                <Route path="/:id/" element={<Publicaciones grupo={props.grupo} />} />
                <Route path="/:id/fotos" element={<Imagenes/>} />
                <Route path="/:id/about" element={<AboutColonia grupo={props.grupo}/>} />
            </RoutesWithNotFound>
        </div>
    )
}
