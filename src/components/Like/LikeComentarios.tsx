import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { useState } from 'react';

interface Props {
    idPublicacion: number;
    idComentario: number;
    idRespuesta: number;
    idperfil: number;
    UserLikes: number;
    tipo: number;
}
const LikeComentarios: React.FC<Props> = (props) => {
    const [like, setLike] = useState(props.UserLikes);
    const { darLikeAComentario, darLikeAComentarioRespuesta } = usePublicaciones();

    const handlelike = async () => {
        like === 1 ? setLike(0) : setLike(1);
        if (props.tipo === 1) {
            darLikeAComentario(props.idPublicacion, props.idComentario, like, props.idperfil)
        }else if (props.tipo === 2) 
        {
            darLikeAComentarioRespuesta(props.idPublicacion, props.idComentario, props.idRespuesta, like, props.idperfil)
            console.log(props.idPublicacion, props.idComentario, props.idRespuesta,  like, props.idperfil);
        }
    
    };

    return (
        <div>
            {like === 1? (
                <IonIcon className='iconoMeGusta like icono' icon={heart} onClick={() => handlelike()}/>
                ) : (
                <IonIcon className='iconoMeGusta icono' icon={heart} onClick={() => handlelike()} />
            )}
        </div>
    )
}

export default LikeComentarios