

import { IonIcon } from "@ionic/react";
import { closeCircleOutline, chatbubbleOutline, heart, sparkles, medalOutline, leafOutline, peopleOutline, checkmarkOutline, notificationsOffOutline } from 'ionicons/icons';
import "./Notificaciones.css";
import { useEffect, useState } from "react";
import { NotificacionUser } from '../../../models';
import { getNotificaciones, CambiarEstadoNotificacion, MarcaNotificacionesNoLeidas } from '../../../services';
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  mostrarNotificaciones: () => void;
}
const Notificaciones: React.FC<Props> = (props) => {
  const [respuesta, setRespuestas] = useState([] as NotificacionUser[]);
  const userState = useSelector((store: AppStore) => store.user);
  const [mostrarTodas, setMostrarTodas] = useState(true);



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

  const setMarcarLeido = async () => {
    try {
      await MarcaNotificacionesNoLeidas(userState.IdPerfil);
      consultarFollowers();
    } catch (error) {
      console.error('Error al consultar el servicio:', error);
    }
  }

  const NotificacionesOrdenadas = [...respuesta].sort(
    (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
  );

  const obtenerNotificaciones = () => {
    if (mostrarTodas) {
      return NotificacionesOrdenadas; // Muestra todas las notificaciones
    } else {
      return NotificacionesOrdenadas.filter(notification => !notification.state); // Filtra las notificaciones no leídas
    }
  };

  return (
    <div className="Notificaciones">
      <div className='Notificaciones-header'>
        <h3>Notificaciones</h3>
        <IonIcon className='Icono-cerrar' onClick={props.mostrarNotificaciones} icon={closeCircleOutline} />
      </div>
      <ul>
        <li className={mostrarTodas == true ? 'UlLinea' : ''} onClick={() => setMostrarTodas(true)}>Todas</li>
        <li className={mostrarTodas == false ? 'UlLinea' : ''} onClick={() => setMostrarTodas(false)}>No leídas</li>
      </ul>
      { obtenerNotificaciones().length > 0 && mostrarTodas == false && (
        <div className='Boton-Leidas'>
          <button onClick={setMarcarLeido}><IonIcon className='' icon={checkmarkOutline} /> Marcar todas como leídas</button>
        </div>
      )}
      {NotificacionesOrdenadas.length === 0 && (
        <div className=''>

        </div>
      )}

      {obtenerNotificaciones().length === 0 ? (
        <div className="SinNotificaciones">
          <IonIcon className='icono-SinNotificaciones' icon={notificationsOffOutline} />
          <p>No tienes notificaciones.</p>
        </div>

      ) : (
        obtenerNotificaciones().map((notification) => (
          <div className="div-Notificaciones">
            {notification.typeNotification != 6 && notification.typeNotification !== 7 && notification.typeNotification !== 8 && notification.typeNotification !== 9 ? (
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
                    {notification.typeNotification == 2 || notification.typeNotification == 5 || notification.typeNotification == 10 ? (
                      <IonIcon className='icono-comentario' icon={chatbubbleOutline} />
                    ) : (
                      <IonIcon className='icono-megusta' icon={heart} />
                    )}
                  </div>
                  <img src={notification.fotoUser} alt={notification.nombreUser} />
                  <p><span>{notification.nombreUser}</span> {notification.contenido} <p>{format(new Date(notification.fechaCreacion), "dd 'de' MMMM 'a las' HH:mm")}</p></p>
                  {notification.state != true && (
                    <div className="Notificaciones-NoLeidas"></div>
                  )}
                </div>
              </Link >

            ) : notification.typeNotification === 7 ? (

              <Link to={`/Home/Felicidades`}
                key={notification.idNotification}
                onClick={() => {
                  if (notification.state !== true) {
                    setLeido(notification.idNotification);
                  }
                }}>
                <div className="Notificaciones-content" onClick={props.mostrarNotificaciones}>
                  <div className="Notificaciones-content-icono">
                    <IonIcon className='icono-medalla' icon={medalOutline} />
                  </div>
                  <img src={userState.ImagenPerfil} alt={userState.NombrePerfil} />
                  <p>¡Felicidades <span>{userState.NombrePerfil}</span>, {notification.contenido} 🎉 <p>{format(new Date(notification.fechaCreacion), "dd 'de' MMMM 'a las' HH:mm")}</p></p>
                  {notification.state != true && (
                    <div className="Notificaciones-NoLeidas"></div>
                  )}
                </div>

              </Link>
            ) : notification.typeNotification == 8 ? (
              <Link to={`/Home/Colonias/${notification.idColonia}/${notification.nombreColonia.replace(/\s+/g, '').replace(/[^\w\s-]/g, '')}`}
                key={notification.idNotification}
                onClick={() => {
                  if (notification.state !== true) {
                    setLeido(notification.idNotification);
                  }
                }}
              >
                <div className="Notificaciones-content" onClick={props.mostrarNotificaciones}>
                  <div className="Notificaciones-content-icono">
                    <IonIcon className='icono-colonia' icon={leafOutline} />
                  </div>
                  <img src={notification.fotoUser} alt={notification.nombreUser} />
                  <p><span>{notification.nombreUser}</span> {notification.contenido} <span>{notification.nombreColonia}</span><p>{format(new Date(notification.fechaCreacion), "dd 'de' MMMM 'a las' HH:mm")}</p></p>
                  {notification.state != true && (
                    <div className="Notificaciones-NoLeidas"></div>
                  )}
                </div>
              </Link >

            ) : notification.typeNotification == 9 ? (
              <Link to={`/Home/Colonias/${notification.idColonia}/${notification.nombreColonia.replace(/\s+/g, '').replace(/[^\w\s-]/g, '')}`}
                key={notification.idNotification}
                onClick={() => {
                  if (notification.state !== true) {
                    setLeido(notification.idNotification);
                  }
                }}
              >
                <div className="Notificaciones-content" onClick={props.mostrarNotificaciones}>
                  <div className="Notificaciones-content-icono">
                    <IonIcon className='icono-colonia-mas' icon={peopleOutline} />
                  </div>
                  <img src={notification.fotoUser} alt={notification.nombreUser} />
                  <p><span>{notification.nombreUser}</span> {notification.contenido} <span>{notification.nombreColonia}</span><p>{format(new Date(notification.fechaCreacion), "dd 'de' MMMM 'a las' HH:mm")}</p></p>
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
                  <p><span>{notification.nombreUser}</span> {notification.contenido}<p>{format(new Date(notification.fechaCreacion), "dd 'de' MMMM 'a las' HH:mm")}</p></p>
                  {notification.state != true && (
                    <div className="Notificaciones-NoLeidas"></div>
                  )}
                </div>
              </Link>
            )
            }
          </div>
        ))
      )}
    </div >
  );
};

export default Notificaciones;
