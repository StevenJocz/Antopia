import { IonIcon } from "@ionic/react";
import { closeCircleOutline, flagOutline, trashOutline } from 'ionicons/icons';
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import { Reporte } from "./Reporte";
import { EliminarPublicacion } from "./EliminarPublicacion";


interface Props {
    mostrarAccionesDos: () => void;
    idUser: number;
    idPublicacion: number;
}

const AccionesDos: React.FC<Props> = (props) => {
    const [eliminar, setEliminar] = useState(false);
    const userState = useSelector((store: AppStore) => store.user);
    const [verReporte, setVerReporte] = useState(false);
    const [verEliminar, setVerEliminar] = useState(false);

    useEffect(() => {

        if (userState.IdPerfil == props.idUser || userState.Level == 6) {
            setEliminar(true)
        } else {
            setEliminar(false)
        }

    }, []);

    const haddleVerReporte = () => {
        setVerReporte(!verReporte);
    };

    const haddleVerEliminar = () => {
        setVerEliminar(!verEliminar);
    };

    return (
        <>
            <div className='Acciones'>
                <div className='Acciones_cerrar'>
                    <IonIcon className='Icono-cerrar' onClick={() => props.mostrarAccionesDos()} icon={closeCircleOutline} />
                </div>
                <span onClick={haddleVerReporte}> <IonIcon icon={flagOutline} className='Acciones-icon' />  Reportar publicación</span>
                {eliminar &&
                    <span onClick={haddleVerEliminar}> <IonIcon icon={trashOutline} className='Acciones-icon' />  Eliminar publicación</span>
                }

            </div>
            {verReporte && (
                <Reporte haddleVerReporte={() => setVerReporte(!verReporte)} idPublicacion={props.idPublicacion} />
            )}
            {verEliminar && (
                <EliminarPublicacion haddleVerEliminar={() => setVerEliminar(!verEliminar)} idPublicacion={props.idPublicacion} />
            )}
        </>
    )
}

export default AccionesDos