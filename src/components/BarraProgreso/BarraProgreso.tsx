import React from 'react';
import './BarraProgreso.css';

import Huevo from '../../assets/imagenes/huevo.png';
import Larva from '../../assets/imagenes/larva.png'
import Pupa from '../../assets/imagenes/pupa.png';
import Hormiga from '../../assets/imagenes/hormiga.png';
import Soldado from '../../assets/imagenes/soldado.png';
import Reina from '../../assets/imagenes/reina.png';

interface Props {
    percent: number;
    level: number;

}

const BarraProgreso: React.FC<Props> = (props) => {
   
    const progressBarStyle = {
        width: `${props.percent}%`,
    };

    let nivelAtual;
    let nivelSigueinte;
    let texto;

    if (props.level > 0) {
        switch (parseInt(props.level.toString())) {
            case 1:
                nivelAtual = Huevo;
                nivelSigueinte= Larva;
                texto = 'Nivel huevo';
                break;
            case 2:
                nivelAtual = Larva;
                nivelSigueinte= Pupa;
                texto = 'Nivel larva';
                break;
            case 3:
                nivelAtual = Pupa;
                nivelSigueinte= Hormiga;
                texto = 'Nivel pupa';
                break;
            case 4:
                nivelAtual = Hormiga;
                nivelSigueinte= Soldado;
                texto = 'Nivel hormiga';
                break;
            case 5:
                nivelAtual = Soldado;
                nivelSigueinte= Reina;
                texto = 'Nivel soldado';
                break;
            case 6:
                nivelAtual = Reina;
                nivelSigueinte= Reina;
                texto = 'Nivel reina';
                break;
        }
    } 

    
    return (
        <div className='BarraProgreso'>
            <img src={nivelAtual} className='huevo' alt="" />
            <div className='BarraProgreso-nivel'>
                <p>Actual: { texto}</p>
                <div className="progress-bar">
                    <div className="progress-bar-progreso" style={progressBarStyle}></div>
                </div>
            </div>
            <img src={nivelSigueinte} alt="" />
        </div>
    );
};

export default BarraProgreso;

