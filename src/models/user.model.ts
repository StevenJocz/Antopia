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
  PerfilImagenes:  PerfilImagenes;
}

export interface PerfilImagenes {}
