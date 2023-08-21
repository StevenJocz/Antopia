
import RegistrarDiario from './RegistrarDiario'
import { useState } from 'react';
import { useDiarioContext } from '../../../Context/DiarioContext';
import { format } from 'date-fns';
import './PerfilContenido.css'

const Diario = () => {
    const [verRegistrarDiario, setRegistrarDiario] = useState(false);
    const [tipo, setTipo] = useState(false);
    const { diarioData } = useDiarioContext();
    const [selectedDiarioId, setSelectedDiarioId] = useState(1);

    const mostrarRegistrarDiario = (tipo: boolean) => {
        setRegistrarDiario(true);
        setTipo(tipo);
    };

    const mostrarRegistrosDiario = (id: number) => {
        setSelectedDiarioId(id);
    };

    return (
        <div className='Diario'>
            <div className='Diario-nav'>
                <ul>
                    <li className='LiBoton' onClick={() => mostrarRegistrarDiario(true)}><button>Crear nuevo diario</button></li>
                    {diarioData.map((diario, index) => (
                        <li key={index} onClick={() => mostrarRegistrosDiario(diario.id)}>{diario.diario}</li>
                    ))}
                </ul>
            </div>
            <div className='Diario-content'>
                <div className='Diario-content-boton'>
                    <button onClick={() => mostrarRegistrarDiario(false)} >Agregar registro al diario</button>
                </div>
                {selectedDiarioId !== null && (
                    <div >
                        <h1>{diarioData.find(diario => diario.id === selectedDiarioId)?.diario}</h1>
                        {diarioData
                            .find(diario => diario.id === selectedDiarioId)
                            ?.registros
                            .slice()
                            .reverse() 
                            .map((registro, registroIndex, registros) => (
                                <div className='Diario-content-publicado' key={registroIndex}>
                                    <h3>{`Día ${registros.length - registroIndex}: ${format(new Date(registro.fecha), 'd \'de\' MMMM, yyyy')}`}</h3>
                                    <p>{registro.contenido}</p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {verRegistrarDiario && (
                <RegistrarDiario mostrarRegistrarDiario={() => setRegistrarDiario(false)} tipo={tipo} id={selectedDiarioId} />
            )}

        </div>

    )
}

export default Diario