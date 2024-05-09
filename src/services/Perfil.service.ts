import axios from 'axios';
import { InfoPerfil, services, NotificacionUser } from "../models";

const baseUrl = services.local

export const getPerfil = async (idUser: number, idUserConsulta: number) => {
    const url = `${baseUrl}User/Datos_User?idUser=${idUser}&idUserConsulta=${idUserConsulta}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const user: InfoPerfil[] = response.data.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            ImagenPortada: item.imagenPortada,
            Nivel: 5,
            Frase: item.frase,
            Correo: item.correo,
            CantidadPublicaciones: item.cantidadPublicaciones,
            Seguidores: item.seguidores,
            TotalSeguiendo: item.totalSeguiendo,
            Siguiendo: item.seguiendo,
            Level: item.level,
            PerfilImagenes: item.perfilImagenes
        }));

        return user;
    } catch (error) {
        throw error;
    }
};


export const getPerfilUser = async (texto: string) => {
    const keyword = texto.replace('@', '');
    const url = `${baseUrl}User/ConsultarUsuarioPorProfile?keyword=${keyword}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const user: InfoPerfil[] = response.data.map((item: any) => ({
            IdPerfil: item.id,
            NombrePerfil: item.s_user_name,
            urlPerfil: item.s_userProfile,
            ImagenPerfil: item.s_userPhoto,
            Level: item.fk_tbl_level,

        }));

        return user;
    } catch (error) {
        throw error;
    }
};


export const getFollowers = async (accion: number, idUser: number) => {
    const url = `${baseUrl}User/ConsultarFollowers?accion=${accion}&user=${idUser}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const user: InfoPerfil[] = response.data.map((item: any) => ({
            IdPerfil: item.id,
            NombrePerfil: item.s_user_name,
            urlPerfil: item.s_userProfile,
            ImagenPerfil: item.s_userPhoto,
            Level: item.fk_tbl_level,

        }));

        return user;
    } catch (error) {
        throw error;
    }
};


export const getRecomendaFollowers = async (idUser: number) => {
    const url = `${baseUrl}User/ConsultarNotFollowers?user=${idUser}`;

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const user: InfoPerfil[] = response.data.map((item: any) => ({
            IdPerfil: item.id,
            NombrePerfil: item.s_user_name,
            urlPerfil: item.s_userProfile,
            ImagenPerfil: item.s_userPhoto,
            Level: item.fk_tbl_level,

        }));

        return user;
    } catch (error) {
        throw error;
    }
};

export const getNotificaciones = async (idUser: number) => {

    const url = `${baseUrl}Notificaciones/ListarNotificacionesUser?idUser=${idUser}`;

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const Notificaciones: NotificacionUser[] = response.data.map((item: any) => ({
            idNotification: item.idNotification,
            typeNotification: item.typeNotification,
            idPublicacion: item.idPublicacion,
            tituloPublicacion: item.tituloPublicacion,
            idUser: item.idUser,
            fotoUser: item.fotoUser,
            nombreUser: item.nombreUser,
            contenido: item.contenido,
            state: item.state,
            fechaCreacion: item.fechaCreacion,
            urlPerfil: item.urlPerfil,
            nombreColonia: item.nombreColonia,
            idColonia: item.idColonia
        }));

        return Notificaciones;
    } catch (error) {
        throw error;
    }
};

export const MarcaNotificacionesNoLeidas = async (idUser: number) => { 
    const url = baseUrl + 'Notificaciones/MarcaNotificacionesNoLeidas';
    const token = localStorage.getItem('token');
    const data = {
        "id_user": idUser 
    };
    
    console.log(data)
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const CambiarEstadoNotificacion = async (idNotification: number) => { 
    const url = baseUrl + 'Notificaciones/CambiarEstadoNotificacion';
    const token = localStorage.getItem('token');
    const data = {
        "id_notification": idNotification
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHayNotificacion = async (idUser: number) => {

    const url = `${baseUrl}Notificaciones/Notificaciones?idUser=${idUser}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        return response.data;
    } catch (error) {
        
    }
};

export const getNivel = async (idUser: number) => {

    const url = `${baseUrl}User/level?idUser=${idUser}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
    }
};

export const GetInvitarDiario = async (idPerfil: number, Nombre: string) => {
    const url = `${baseUrl}/User/InvitarDiario?idPerfil=${idPerfil}&NombreUser=${Nombre}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
    }
};