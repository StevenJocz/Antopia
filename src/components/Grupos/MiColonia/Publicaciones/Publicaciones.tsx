
import { PublicacionesProvider } from "../../../../Context/PublicacionesContext";
import { Colonia } from "../../../../models";
import Card from "../../../Card/Card";
import { NuevoPost } from "../../../NuevoPost";
import '../MiColonia.css'



interface Props {
    grupo: Colonia | null;
}

const Publicaciones: React.FC<Props> = (props) => {
    const { grupo } = props;
    return (
        <div className="Publicaciones-colonias">
            <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={grupo?.id_colonies ?? 0} opcion={4} hashtag="">
                <h3>Publicaciones {grupo?.s_name}</h3>
                {grupo?.esmember == 1 && (<NuevoPost tipo={5} idColonia={grupo.id_colonies} />)}
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default Publicaciones

