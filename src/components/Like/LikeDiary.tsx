import { useState } from "react";
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { useDiarioContext } from '../../Context/DiarioContext';


interface Props {
    idDiary: number;
    idperfil: number;
    UserLikes: number;
}

const LikeDiary: React.FC<Props> = (props) => {
    const [like, setLike] = useState(props.UserLikes);
    const { darLikeDiary} = useDiarioContext();

    const handlelike = async () => {
        like === 1 ? setLike(0) : setLike(1);
        await darLikeDiary(props.idDiary, like, props.idperfil);
        
    };

    return (
        <div>
        {like === 1? (
            <IonIcon className='Diario-content-boton-icono iconoMeGusta like' icon={heart} onClick={() => handlelike()}/>
            ) : (
            <IonIcon className='Diario-content-boton-icono iconoMeGusta' icon={heart} onClick={() => handlelike()} />
        )}
    </div>
    )
}

export default LikeDiary