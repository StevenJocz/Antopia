import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from 'ionicons/icons';
import { useDiarioContext } from "../../../Context/DiarioContext";
import { useState } from "react";
import { AppStore } from '../../../redux/store';
import { useSelector } from "react-redux";

interface Props {
    mostrarRegistrarDiario: () => void;
    tipo: boolean;
    id: number;
}

const RegistrarDiario: React.FC<Props> = (props) => {
    const { agregarRegistro, agregarDiario, lastDiarioId } = useDiarioContext();
    const [nombreDiario, setNombreDiario] = useState("");
    const [fechaDiario, setFechaDiario] = useState("");
    const [contenidoDiario, setContenidoDiario] = useState("");
    const userState = useSelector((store: AppStore) => store.user);

    const handleRegistrarDiarioSinRegistros = () => {
        if (nombreDiario === "") {
            alert("Debes ingresar un nombre para el diario");
            return;
        }

        const nuevoDiario = {
            idPerfil: userState.IdPerfil,
            id: lastDiarioId + 1,
            diario: nombreDiario,
            registros: [],
        };

        agregarDiario(nuevoDiario);
        props.mostrarRegistrarDiario();
    };

    const handleRegistrarDia = () => {
        if (fechaDiario === "") {
            alert("Debes seleccionar una fecha");
            return;
        }
        if (contenidoDiario === "") {
            alert("Debes ingresar un contenido");
            return;
        }

        const nuevoRegistro = {
            fecha: fechaDiario,
            contenido: contenidoDiario,
        };
        agregarRegistro(props.id, nuevoRegistro);

        props.mostrarRegistrarDiario();
    };

    return (
        <div className="RegistrarDiario">
            <div className="RegistrarDiario-content">
                <div className='CardComentarios-content_header_cerrar'>
                    <IonIcon className='Icono-cerrar' onClick={props.mostrarRegistrarDiario} icon={closeCircleOutline} />
                </div>
                <div>
                    {props.tipo ?
                        <div className="Formulario-registroDiario">
                            <div className="Formulario-encabezado">
                                <h3>Registrar Diario</h3>
                                <p>Aqui podras registrar tu diario</p>
                            </div>
                            <div className="Formulario-content">
                                <label>Nombre del diario</label>
                                <input
                                    type="text"
                                    placeholder="Escribe el nombre que le quieres dar al diario"
                                    value={nombreDiario}
                                    onChange={(e) => setNombreDiario(e.target.value)}
                                />
                            </div>
                            <div className="Formulario-footer">
                                <button onClick={handleRegistrarDiarioSinRegistros}>Registrar</button>
                            </div>
                        </div>
                        :
                        <div className="Formulario-registroDiario">
                            <div className="Formulario-encabezado">
                                <h3>Registrar el dia de tu diario</h3>
                                <p>Aqui podras registrar tu diario</p>
                            </div>
                            <div className="Formulario-content">
                                <label>Fecha</label>
                                <input
                                    type="Date"
                                    placeholder="Seleccione la fecha"
                                    value={fechaDiario}
                                    onChange={(e) => setFechaDiario(e.target.value)} />
                                <div className="Formulario-content-textarea">
                                    <textarea
                                        placeholder="Escribe el nombre que le quieres dar al diario"
                                        value={contenidoDiario}
                                        onChange={(e) => setContenidoDiario(e.target.value)}
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="Formulario-footer">
                                <button onClick={handleRegistrarDia}>Registrar</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RegistrarDiario