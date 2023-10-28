
import { useState } from 'react';
import { PostFollowers } from '../../services';

interface Props {
    idPerfil: number;
    idSeguidor: number;
    Siguiendo: number;
}

const BotonFollowers : React.FC<Props> = (props) => {

    const [Siguiendo, setSiguiendo] = useState(props.Siguiendo);

    const toggleFollowers = async (isfollower: number) => {
        await PostFollowers(props.idPerfil, props.idSeguidor, isfollower);
        Siguiendo === 0 ? setSiguiendo(1) : setSiguiendo(0);
    };


    return (

        <button
            className="BotonFollowers"
            onClick={() => toggleFollowers(Siguiendo === 0 ? 1 : 0)}
        >
            {Siguiendo === 0 ? "Seguir" : "Siguiendo"}
        </button>

    )
}

export default BotonFollowers