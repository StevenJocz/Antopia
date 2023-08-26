import React, { useEffect, useState } from 'react';
import { useDiarioContext } from '../../../Context/DiarioContext';
import { format } from 'date-fns';
import RegistrarDiario from './RegistrarDiario';
import { AppStore } from '../../../redux/store';
import { useSelector } from "react-redux";
import './PerfilContenido.css';

interface Props {
    idPerfil: number;
}

const Diario: React.FC<Props> = (props) => {
    const [verRegistrarDiario, setRegistrarDiario] = useState(false);
    const [tipo, setTipo] = useState(false);
    const { getDiariosPorIdPerfil } = useDiarioContext();
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false);
    const userState = useSelector((store: AppStore) => store.user);

    const [selectedDiarioId, setSelectedDiarioId] = useState<number>(1);

    const mostrarRegistrarDiario = (tipo: boolean) => {
        setRegistrarDiario(true);
        setTipo(tipo);
    };

    const mostrarRegistrosDiario = (id: number) => {
        setSelectedDiarioId(id);
    };

    const diariosPorIdPerfil = getDiariosPorIdPerfil(props.idPerfil);

    useEffect(() => {
        if (props.idPerfil === userState.IdPerfil) {
            setMostrarRegistrar(true);
        } else {
            setMostrarRegistrar(false);
        }
    }, [props.idPerfil, userState.IdPerfil]);


    return (
        <div className='Diario'>
            <div className='Diario-nav'>
                <ul>
                    {mostrarRegistrar && (
                        <li className='LiBoton' onClick={() => mostrarRegistrarDiario(true)}><button>Crear nuevo diario</button></li>
                    )}

                    {diariosPorIdPerfil.map((diario, index) => (
                        <li key={index} onClick={() => mostrarRegistrosDiario(diario.id)}>{diario.diario}</li>
                    ))}
                </ul>
            </div>
            <div className='Diario-content'>
                {mostrarRegistrar && (
                    <div className='Diario-content-boton'>
                        <button onClick={() => mostrarRegistrarDiario(false)} >Agregar registro al diario</button>
                    </div>
                )}

                {selectedDiarioId !== null && (
                    <div>
                        <h1>{diariosPorIdPerfil.find(diario => diario.id === selectedDiarioId)?.diario}</h1>
                        {diariosPorIdPerfil
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
    );
};

export default Diario;
