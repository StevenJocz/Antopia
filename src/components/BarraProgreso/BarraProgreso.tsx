import React from 'react';
import './BarraProgreso.css';

import Huevo from '../../assets/imagenes/huevo.png';
import Hormiga from '../../assets/imagenes/hormiga.png';

interface CircularProgressProps {
    percent: number;
    skill: string;
}

const BarraProgreso: React.FC<CircularProgressProps> = ({
    percent,
    skill
}) => {
    const progressBarStyle = {
        width: `${percent}%`,
    };

    return (
        <div className='BarraProgreso'>
            <img src={Huevo} className='huevo' alt="" />
            <div className='BarraProgreso-nivel'>
                <p>Rango actual: {skill}</p>
                <div className="progress-bar">
                    <div className="progress-bar-progreso" style={progressBarStyle}></div>
                </div>
            </div>
            <img src={Hormiga} alt="" />
        </div>
    );
};

export default BarraProgreso;

