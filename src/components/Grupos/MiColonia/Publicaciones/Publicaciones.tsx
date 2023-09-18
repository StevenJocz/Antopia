import { NuevoPost } from "."
import { Colonia } from "../../../../models";

interface Props {
    grupo: Colonia | null;
}

const Publicaciones: React.FC<Props> = (props) => {
    const { grupo } = props;
    return (
        <div>
            {grupo?.esmember == 1 && (<NuevoPost grupo={props.grupo} />)}
            <h3>Publicaciones</h3>
        </div>
    )
}

export default Publicaciones