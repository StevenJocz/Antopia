import { IonIcon } from '@ionic/react';
import { search, closeCircleOutline, imageOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import './Chat.css'
import { Colonia, InfoPerfil, chat, services } from '../../models';
import { getFollowers, getUserColonias } from '../../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import io from 'socket.io-client';

interface Props {
  handleVerPerviaChat: () => void;
  handleVerViewChat: (idPerfil: number) => void;
  handleVerColonia: (idColonia: number) => void;
}

const ChatPrevia: React.FC<Props> = (props) => {
  const [verBuscarChat, setVerBuscarChat] = useState(false);
  const [verColonia, setVerColonia] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [respuestaChat, setRespuestaChat] = useState([] as chat[]);
  const userState = useSelector((store: AppStore) => store.user);
  const [searchText, setSearchText] = useState('');
  const [respuestaFollowers, setRespuestaFollowers] = useState([] as InfoPerfil[]);
  const [listColonia, setListColonia] = useState<Colonia[]>([]);
  const baseUrl = services.socket
  const socket = io(baseUrl);

  const consultarFollowers = async () => {
    try {
      const resultado: InfoPerfil[] = await getFollowers(2, userState.IdPerfil);
      setRespuestaFollowers(resultado);

    } catch (error) {
      console.error('Error al consultar el servicio:', error);
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };


  const filterProfiles = () => {
    return respuestaFollowers.filter(
      (perfil) =>
        perfil.NombrePerfil.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handdleBuscarChat = () => {
    consultarFollowers();
    setVerBuscarChat(!verBuscarChat);
  };


  const handdleColonia = () => {
    setVerColonia(!verColonia);
    setVerBuscarChat(false);
  };

  const handleReceiveMessage = (msg: []) => {
    setRespuestaChat(msg);
  };

  useEffect(() => {
    socket.emit('user_connected', userState.IdPerfil);

    if (verBuscarChat && inputRef.current) {
      inputRef.current.focus();
    }

    socket.emit('mensajesPrevios', userState.IdPerfil);

    socket.on('mensajes', (data) => {
      setRespuestaChat(data);
    });

    socket.on('mensajes', handleReceiveMessage);

    const fetchUserColonias = async () => {
      try {
        const colonias: Colonia[] = await getUserColonias(userState.IdPerfil);
        setListColonia(colonias);
      } catch (error) {
        console.error('Error al obtener las colonias del usuario:', error);
      }
    };
    fetchUserColonias();

    return () => {
      socket.emit('user_disconnected', userState.IdPerfil);
      socket.off('mensajes', handleReceiveMessage);
      socket.disconnect();
    };

  }, [userState.IdPerfil]);



  const filteredProfiles = filterProfiles();

  const handleCerrarChat = () => {
    props.handleVerPerviaChat();
  }

  return (
    <>
      <div className='Chat_header'>
        <div className='Chat-center-cerrar'>
          <IonIcon className='icoo' icon={closeCircleOutline} onClick={handleCerrarChat} />
        </div>
        <div className='Chat_header-text'>
          <ul>
            <li onClick={() => setVerColonia(false)}>Usuarios</li>
            <li onClick={handdleColonia}>Grupos</li>
          </ul>
          <div className='Chat_header-input'>
            <input
              type="text"
              placeholder='Buscar usuario o colonia'
              ref={inputRef}
              value={searchText}
              onChange={handleInputChange}
              onFocus={handdleBuscarChat}
            />
            <IonIcon className='Chat_header-icono Chat_header-input-icono' icon={search} />
            <IonIcon className='Chat_header-icono Chat_header-input-close' icon={closeCircleOutline} onClick={handdleBuscarChat} />
          </div>
        </div>
      </div>
      {verBuscarChat ? (
        <div className="SearchResults">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((perfil, index) => (
              <div className='Chat_Content' onClick={() => props.handleVerViewChat(perfil.IdPerfil)} key={index}>
                <div className='Chat_Content-img'>
                  <img src={perfil.ImagenPerfil} alt="" />
                </div>
                <div className='Chat_Content-info'>
                  <h2>{perfil.NombrePerfil}</h2>
                </div>
                <div></div>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>

      ) : verColonia ? (
        <div className="Chat_Content-Respuesta">
          {listColonia.map(colonia => (
            <div className='Chat_Content' onClick={() => props.handleVerColonia(colonia.id_colonies)} key={colonia.id_colonies}>
              <div className='Chat_Content-img'>
                <img src={colonia.s_photo} alt="" />
              </div>
              <div className='Chat_Content-info'>
                <h2>{colonia.s_name}</h2>
              </div>
              <div className=''></div>
            </div>
          ))}
        </div>
      ) : (
        respuestaChat.length === 0 ? (
          <div className='Chat_Content'>
            <p>No hay chats disponibles</p>
          </div>
        ) : (
          <div className="Chat_Content-Respuesta">
            {respuestaChat.map((chatItem, index) => (
              <div className='Chat_Content' onClick={() => props.handleVerViewChat(chatItem.id)} key={index}>
                <div className='Chat_Content-img'>
                  <img src={chatItem.foto_usuario} alt="" />
                </div>
                <div className='Chat_Content-info'>
                  <h2>{chatItem.usuario}</h2>
                  <p>{chatItem.de == userState.IdPerfil ? 'Tu:' : ''} {chatItem.message == '' ? <><IonIcon className='iconoFotoP' icon={imageOutline} /> Foto</> : chatItem.message}</p>
                </div>
                <div className={chatItem.nuevo == 1 && userState.IdPerfil != chatItem.de ?    "Chat_Content-linea" : 'Chat_Content-off'}></div>
              </div>
            ))}

          </div>
        )
      )}
    </>
  )
}

export default ChatPrevia