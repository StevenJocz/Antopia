import React from 'react';
import Huevo from '../../assets/imagenes/huevo.png';
import Larva from '../../assets/imagenes/larva.png'
import Pupa from '../../assets/imagenes/pupa.png';
import Hormiga from '../../assets/imagenes/hormiga.png';
import Soldado from '../../assets/imagenes/soldado.png';
import Reina from '../../assets/imagenes/reina.png';

import './Level.css';

interface Props {
    idlevel: number;
}

const Level: React.FC<Props> = (props) => {
    let imagen;
    let texto;

    switch (props.idlevel) {
        case 1:
            imagen = Huevo;
            texto = 'Nivel huevo';
            break;
        case 2:
            imagen = Larva;
            texto = 'Nivel larva';
            break;
        case 3:
            imagen = Pupa;
            texto = 'Nivel pupa';
            break;
        case 4:
            imagen = Hormiga;
            texto = 'Nivel hormiga';
            break;
        case 5:
            imagen = Soldado;
            texto = 'Nivel soldado';
            break;
        case 6:
            imagen = Reina;
            texto = 'Nivel reina';
            break;
        // Agrega más casos según sea necesario para los niveles restantes.
        default:
            // En caso de que el nivel no coincida con ninguno de los casos anteriores, puedes mostrar una imagen predeterminada o un mensaje de error.
            imagen = ''; // Cambia esto a la imagen predeterminada o a un mensaje de error adecuado.
            break;
    }

    return (
        <div className='Level'>
            <div className='Level-content'>
                <p>{texto}</p>
            </div>
            <img src={imagen} alt={`Nivel ${props.idlevel}`} />
        </div>
    );
};

export default Level;
