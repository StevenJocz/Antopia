import { IonIcon } from "@ionic/react";
import { people, earth, calendar } from 'ionicons/icons';
import { Colonia } from "../../../../models";
import { format } from "date-fns";

import './AboutColonia.css';
import { Link } from "react-router-dom";
import { AppStore } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { BotonFollowers } from "../../../BotonFollowers";

interface Props {
  grupo: Colonia | null;
}

export const AboutColonia: React.FC<Props> = (props) => {
  const userState = useSelector((store: AppStore) => store.user);
  const { grupo } = props;

  const handleM = () => {};
  
  return (
    <div className="AboutColonia">
      <div className="AboutColonia__header">
        <h3>Información de la colonia</h3>
        <p>Una comunidad donde todos pretendemos ser hormigas en una colonia de hormigas</p>
        <div className="AboutColonia__header_info">
          <IonIcon className='Icono-About' icon={people} />
          <p>Solo los miembros pueden publicar, dar me gusta o comentar.</p>
        </div>
        <div className="AboutColonia__header_info">
          <IonIcon className='Icono-About' icon={earth} />
          <p><span>Todas las colonias son visibles públicamente.</span> Cualquiera puede unirse a esta colonia.</p>
        </div>
        <div className="AboutColonia__header_info">
          <IonIcon className='Icono-About' icon={calendar} />
          <p>Creado {format(new Date(grupo?.dt_creation || 0), "d 'de' MMMM 'de' yyyy")} por
            <Link to={`/Home/Perfil/${grupo?.fk_tbl_user_creator}/${grupo?.name_creator.replace(/\s/g, '')}`}>
              @{grupo?.name_creator.replace(/\s/g, '')}
            </Link></p>

        </div>
      </div>
      <div className="AboutColonia__reglas">
        <h3>Reglas</h3>
        <div className="AboutColonia_reglas_info">
          <div className="AboutColonia_reglas_info-num" style={{ backgroundColor: grupo?.s_colors }}>
            <span>1</span>
          </div>
          <div className="AboutColonia_reglas_info-content">
            <h4>Sé amable y respetuoso.</h4>
            <p> Sea bueno con sus compañeras hormigas, ya que ellas, como usted, quieren hacer crecer la colonia. Recuerda a la hormiga detrás de la pantalla de hormigas</p>
          </div>
        </div>
        <div className="AboutColonia_reglas_info">
          <div className="AboutColonia_reglas_info-num" style={{ backgroundColor: grupo?.s_colors }}>
            <span>2</span>
          </div>
          <div className="AboutColonia_reglas_info-content">
            <h4>Mantén las publicaciones sobre el tema.</h4>
          </div>
        </div>
        <div className="AboutColonia_reglas_info">
          <div className="AboutColonia_reglas_info-num" style={{ backgroundColor: grupo?.s_colors }}>
            <span>3</span>
          </div>
          <div className="AboutColonia_reglas_info-content">
            <h4>Explora y comparte.</h4>
            <p>Corre la voz de la colonia de hormigas para que pueda crecer y prosperar. Y pasar un buen rato</p>
          </div>
        </div>
        <div className="AboutColonia_reglas_info">
          <div className="AboutColonia_reglas_info-num" style={{ backgroundColor: grupo?.s_colors }}>
            <span>4</span>
          </div>
          <div className="AboutColonia_reglas_info-content">
            <h4>Tienes que publicar como una hormiga.</h4>
            <p>Tus publicaciones pueden ser sobre cualquier tema, siempre y cuando se relacione de alguna manera con la colonia de hormigas. Esto incluye publicaciones sobre la plataforma en la que estamos, si es gracioso.</p>
          </div>
        </div>
      </div>
      <div className="AboutColonia__content">


        <div className="AboutColonia__Reinas">
          <h3>Reinas</h3>
          {grupo?.userMembers
            .filter((miembro) => miembro.level == 6)
            .map((miembro) => (
              <div className="AboutColonia__soldados_info" key={miembro.id_user}>
                <div className="AboutColonia__soldados_info-img">
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </Link>
                </div>
                <div className="AboutColonia__soldados_info-content">
                  <h4>{miembro.nombre}</h4>
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    @{miembro.nombre.replace(/\s/g, '')}
                  </Link>
                </div>
                {miembro.siguiendo === 0 && miembro.id_user != userState.IdPerfil && (
                  <div className="AboutColonia__soldados_info-seguir">
                    <BotonFollowers
                      idPerfil={miembro.id_user}
                      idSeguidor={userState.IdPerfil}
                      Siguiendo={miembro.siguiendo}
                      mostrar={handleM}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="AboutColonia__soldados">
          <h3>Soldados</h3>
          {grupo?.userMembers
            .filter((miembro) => miembro.level === 5)
            .map((miembro) => (
              <div className="AboutColonia__soldados_info" key={miembro.id_user}>
                <div className="AboutColonia__soldados_info-img">
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </Link>
                </div>
                <div className="AboutColonia__soldados_info-content">
                  <h4>{miembro.nombre}</h4>
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    @{miembro.nombre.replace(/\s/g, '')}
                  </Link>
                </div>
                {miembro.siguiendo === 0 && miembro.id_user != userState.IdPerfil && (
                  <div className="AboutColonia__soldados_info-seguir">
                    <BotonFollowers
                      idPerfil={miembro.id_user}
                      idSeguidor={userState.IdPerfil}
                      Siguiendo={miembro.siguiendo}
                      mostrar={handleM}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="AboutColonia__Members">
          <h3>Miembros</h3>
          {grupo?.userMembers
            .filter((miembro) => miembro.level != 5 && miembro.level != 6)
            .map((miembro) => (
              <div className="AboutColonia__soldados_info" key={miembro.id_user}>
                <div className="AboutColonia__soldados_info-img">
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </Link>
                </div>
                <div className="AboutColonia__soldados_info-content">
                  <h4>{miembro.nombre}</h4>
                  <Link to={`/Home/Perfil/${miembro.id_user}/${miembro.nombre.replace(/\s/g, '')}`}>
                    @{miembro.nombre.replace(/\s/g, '')}
                  </Link>
                </div>
                {miembro.siguiendo === 0 && miembro.id_user != userState.IdPerfil && (
                  <div className="AboutColonia__soldados_info-seguir">
                    <BotonFollowers
                      idPerfil={miembro.id_user}
                      idSeguidor={userState.IdPerfil}
                      Siguiendo={miembro.siguiendo}
                      mostrar={handleM}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
