import { useEffect, useState } from 'react';
import { getPerfilUser, getPublicacionesBuscador, gethashtag } from '../../../services';
import { Hashtags, InfoPerfil, PublicacionBuscador } from '../../../models';
import IconAnt from '../../../assets/imagenes/IconAnts.png';
import IconHormiguero from '../../../assets/imagenes/hormiguero.png';
import Home from '../../../assets/imagenes/eco-home.png';
import './Buscador.css'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Level } from '../../Level';

interface Props {
  texto: string;
}

const Buscardor: React.FC<Props> = (props) => {
  const [respuestaHashtags, setRespuestaHashtags] = useState([] as Hashtags[]);
  const [respuestaUser, setRespuestaUser] = useState([] as InfoPerfil[]);
  const [respuesta, setRespuesta] = useState([] as PublicacionBuscador[]);

  const contieneHashtag = (texto: string): boolean => {
    return texto.includes('#'); // Verifica si el texto contiene un '#' como carácter
  };

  const contieneAt = (texto: string): boolean => {
    return texto.includes('@'); // Verifica si el texto contiene un '@' como carácter
  };

  useEffect(() => {
    if (contieneHashtag(props.texto)) {
      consultarHashtag();
    } else if (contieneAt(props.texto)) {
      consultarUser();
    } else {
      consultar();
    }
  }, [props.texto]);

  const consultarHashtag = async () => {
    try {
      const resultado: Hashtags[] = await gethashtag(props.texto);
      setRespuestaHashtags(resultado);

    } catch (error) {
      // Manejo de errores aquí
      console.error('Error al consultar el servicio:', error);
      // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
    }
  };

  const consultarUser = async () => {
    try {
      const resultado: InfoPerfil[] = await getPerfilUser(props.texto);
      setRespuestaUser(resultado);

    } catch (error) {
      // Manejo de errores aquí
      console.error('Error al consultar el servicio:', error);
      // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
    }
  };

  const consultar = async () => {
    try {
      const resultado: PublicacionBuscador[] = await getPublicacionesBuscador(props.texto);
      setRespuesta(resultado);

    } catch (error) {
      // Manejo de errores aquí
      console.error('Error al consultar el servicio:', error);
      // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
    }
  };




  return (
    <div className="Buscardor">
      <div className="Buscardor-content">

        {contieneAt(props.texto) && (
          <div>
            {respuestaUser.map((user, index) => (
              <Link to={`/Home/Perfil/${user.IdPerfil}/${user.urlPerfil}`}>
                <div className='Contenedor-Usuario' key={index}>
                  <div className='Contenedor-Usuario-icono'>
                    <img src={user.ImagenPerfil} alt="" />
                  </div>
                  <div className='Contenedor-buscador-Usuario-info'>
                    <h4>{user.NombrePerfil}</h4>
                    <p>@{user.urlPerfil}</p>
                  </div>
                  <div>
                    <Level  idlevel={user.Level}/>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        )}

        {contieneHashtag(props.texto) && (
          <div>
            {respuestaHashtags.map((hashtag, index) => (
              <Link to={`Hashtag/${hashtag.Hashtag.slice(1)}`}>
                <div className='Contenedor-Hashtag' key={index} >
                  <div className='Contenedor-Hashtag-icono'>
                    <p>#</p>
                  </div>
                  <div className='Contenedor-Hashtag-info'>
                    <h4>{hashtag.Hashtag}</h4>
                    <p>{hashtag.NumeroPublicaciones} publicaciones</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!contieneHashtag(props.texto) && !contieneAt(props.texto) && (
          <div>
            <h2>Publicaciones</h2>
            {respuesta.map((publicacion, index) => (
              <div className='Contenedor-buscador-publi'>
                <div className={`Contenedor-buscador-publicacion Card-Articulo borde-${publicacion.IdTipo === 2 ? "Uno" :
                  publicacion.IdTipo === 3 ? "dos" :
                    publicacion.IdTipo === 4 ? "tres" :
                      "home"}`}
                  key={index}
                >
                  <div className='Contenedor-buscador-publicacion-user'>
                    <img src={publicacion.ImagenPerfil} alt="" />
                    <div>
                      <h4>{publicacion.NombrePerfil}</h4>
                      <p>{format(new Date(publicacion.FechaPublicacion), "dd 'de' MMMM 'a las' HH:mm")}</p>
                    </div>
                  </div>
                  <div className='Contenedor-buscador-publicacion-info'>
                    <h3>{publicacion.Titulo}</h3>
                    <p>{publicacion.Contenido}...</p>
                  </div>
                </div>
                <div
                  className={`Card-content_footer footer-borde-${publicacion.IdTipo === 2 ? "Uno" :
                    publicacion.IdTipo === 3 ? "dos" :
                      publicacion.IdTipo === 4 ? "tres" :
                        "home"}`}
                >
                  <img
                    src={
                      publicacion.IdTipo === 2 ? IconAnt :
                        publicacion.IdTipo === 3 ? IconHormiguero :
                          publicacion.IdTipo === 4 ? IconAnt :
                            Home
                    }
                    alt=""
                  />
                  <a href="">
                    {publicacion.IdTipo === 2 ? "Cría de Hormigas" :
                      publicacion.IdTipo === 3 ? "Construcción de hormigueros" :
                        publicacion.IdTipo === 4 ? "Experimentos y técnicas" :
                          "General"}
                  </a>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Buscardor