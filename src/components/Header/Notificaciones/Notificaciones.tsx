

import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chatbubbleOutline, heart, sparkles } from 'ionicons/icons';
import "./Notificaciones.css";
import { useEffect, useState } from "react";
import { NotificacionUser } from '../../../models';
import { getNotificaciones, CambiarEstadoNotificacion } from '../../../services';
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { Link } from "react-router-dom";

interface Props {
  mostrarNotificaciones: () => void;
}
const Notificaciones: React.FC<Props> = (props) => {
  const [respuesta, setRespuestas] = useState([] as NotificacionUser[]);
  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    consultarFollowers()
  }, []);

  const consultarFollowers = async () => {
    try {
      const resultado: NotificacionUser[] = await getNotificaciones(userState.IdPerfil);
      setRespuestas(resultado);

    } catch (error) {
      console.error('Error al consultar el servicio:', error);
    }
  };

  const setLeido = async (idNotificacion: number) => {
    try {
      await CambiarEstadoNotificacion(idNotificacion);
      props.mostrarNotificaciones;
    } catch (error) {
      console.error('Error al consultar el servicio:', error);
    }
  }

  const NotificacionesOrdenadas = [...respuesta].sort(
    (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
  );

  return (
    <div className="Notificaciones">
      <div className='Notificaciones-header'>
        <h3>Notificaciones</h3>
        <IonIcon className='Icono-cerrar' onClick={props.mostrarNotificaciones} icon={closeCircleOutline} />
      </div>
      {NotificacionesOrdenadas.length === 0 && (
        <div className="Notificaciones-content-sinNotificaciones">
          
          <h3>Nada que ver aquí, por ahora</h3>
          <p>Desde relaciones hasta quienes comentan tus publicaciones y mucho más, aquí es donde toda la acción tiene lugar..</p>
        </div>
      )}

      {NotificacionesOrdenadas.map((notification) => (
        <>
          {notification.typeNotification != 6 ? (
            <Link to={`/Home/Publicacion/${notification.idPublicacion}/${notification.tituloPublicacion.replace(/\s+/g, '').replace(/[^\w\s-]/g, '')}`}
              key={notification.idNotification}
              onClick={() => {
                if (notification.state !== true) {
                  setLeido(notification.idNotification);
                }
              }}
            >
              <div className="Notificaciones-content" onClick={props.mostrarNotificaciones}>
                <div className="Notificaciones-content-icono">
                  {notification.typeNotification == 2 || notification.typeNotification == 5 ? (
                    <IonIcon className='icono-comentario' icon={chatbubbleOutline} />
                  ) : (
                    <IonIcon className='icono-megusta' icon={heart} />
                  )}
                </div>
                <img src={notification.fotoUser} alt={notification.nombreUser} />
                <p><span>{notification.nombreUser}</span> {notification.contenido}</p>
                {notification.state != true && (
                  <div className="Notificaciones-NoLeidas"></div>
                )}
              </div>
            </Link >

          ) : (
            <Link to={`/Home/Perfil/${notification.idUser}/${notification.urlPerfil}`}
              key={notification.idNotification}
              onClick={() => {
                if (notification.state !== true) {
                  setLeido(notification.idNotification);
                }
              }}>
              <div className="Notificaciones-content" onClick={props.mostrarNotificaciones}>
                <div className="Notificaciones-content-icono">
                  <IonIcon className='icono-seguidor' icon={sparkles} />
                </div>
                <img src={notification.fotoUser} alt={notification.nombreUser} />
                <p><span>{notification.nombreUser}</span> {notification.contenido}</p>
                {notification.state != true && (
                  <div className="Notificaciones-NoLeidas"></div>
                )}
              </div>
            </Link>
          )
          }
        </>
      ))
      }
    </div >
  );
};

export default Notificaciones;
