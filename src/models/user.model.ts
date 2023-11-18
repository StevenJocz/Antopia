import { Roles } from './roles';

export interface UserInfo {
  IdPerfil: number;
  NombrePerfil: string;
  urlPerfil: string;
  ImagenPerfil: string;
  email: string;
  Level: number;
  rol: Roles;
  exp: string; 
  iat: string;
  nbf: string;
}

export interface InfoPerfil {
  IdPerfil: number;
  NombrePerfil: string;
  urlPerfil: string;
  ImagenPortada: string;
  ImagenPerfil: string;
  Nivel: number;
  Frase: string;
  CantidadPublicaciones: number;
  Seguidores: number;
  TotalSeguiendo: number;
  Siguiendo: number;
  Level: number;
  PerfilImagenes: PerfilImagenes[];
}

export interface PerfilImagenes {
  idPublicacion: number;
  url: string;
}

export interface UserDTOs {
  id: number;
  s_user_name: string;
  dt_user_birthdate: Date;
  s_user_gender: string;
  fk_user_address_city: number;
  s_user_cellphone: string;
  s_user_email: string;
  s_userProfile: string;
  s_userPhoto: string;
  s_userFrontpage: string;
  fk_tblRol: number;
  fk_tbl_level: number;
}

export interface NotificacionUser { 
    idNotification: number;
    typeNotification: number;
    idPublicacion: number;
    tituloPublicacion: string;
    idUser: number;
    fotoUser: string;
    nombreUser: string;
    contenido: string;
    state: boolean;
    fechaCreacion: Date;
    urlPerfil:string;
    nombreColonia:string;
    idColonia: number;

}
