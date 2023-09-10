import { Roles } from './roles';

export interface UserInfo {
  IdPerfil: number;
  NombrePerfil: string;
  urlPerfil: string;
  ImagenPerfil: string;
  email: string;
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
  Siguiendo: number;
  Level: number;
  PerfilImagenes: string[];
}

export interface PerfilImagenes {}

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
}
