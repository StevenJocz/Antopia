import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { usePublicaciones } from '../../Context/PublicacionesContext';
import { useState } from 'react';
interface Props {
    idPublicacion: number;
    idperfil: number;
    UserLikes: number;
}

const Like: React.FC<Props> = (props) => {
    const [like, setLike] = useState(props.UserLikes);
    const { darLikeAPublicacion } = usePublicaciones();


    const handlelike = async () => {
        like === 1 ? setLike(0) : setLike(1);
        await darLikeAPublicacion(props.idPublicacion, like, props.idperfil);
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

export default Like