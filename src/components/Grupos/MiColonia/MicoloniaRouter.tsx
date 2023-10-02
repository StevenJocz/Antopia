
import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../../utilities"
import { MiColonia } from ".."
import { AboutColonia } from "./AboutColonia"
import { Publicaciones } from "./Publicaciones"
import { Colonia } from "../../../models";

interface Props {
    grupo: Colonia | null;
}

export const MicoloniaRouter : React.FC<Props> = (props) => {
    return (
        <div className="MicoloniaRouter">
            <RoutesWithNotFound>
                <Route path="/:nombre/*" element={<MiColonia />} />
                <Route path="/" element={<Publicaciones grupo={props.grupo} />} />
                <Route path="/fotos" element={<h1>fotos</h1>} />
                <Route path="/about" element={<AboutColonia grupo={props.grupo}/>} />
            </RoutesWithNotFound>
        </div>
    )
}
