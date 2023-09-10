import { InfoPerfil, services } from "../models";

const baseUrl = services.local

export const getPerfil = async (idUser: number, idUserConsulta : number) => {
    const url = `${baseUrl}User/Datos_User?idUser=${idUser}&idUserConsulta=${idUserConsulta}`;

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const result = await response.json();
        
        const user: InfoPerfil[] = result.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            ImagenPortada: item.imagenPortada,
            Nivel: 5,
            Frase: item.frase,
            CantidadPublicaciones: item.cantidadPublicaciones,
            Seguidores: item.seguidores,
            Siguiendo: item.seguiendo,
            Level: item.level,
            PerfilImagenes: item.perfilImagenes
        }));

        return user;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};


export const getPerfilUser = async (texto: string) => {
    const keyword = texto.replace('@', '');
    const url = `${baseUrl}User/ConsultarUsuarioPorProfile?keyword=${keyword}`;

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const result = await response.json();
        
        const user: InfoPerfil[] = result.map((item: any) => ({
            IdPerfil: item.id,
            NombrePerfil: item.s_user_name,
            urlPerfil: item.s_userProfile,
            ImagenPerfil: item.s_userPhoto,
            Level: item.fk_tbl_level,

        }));

        return user;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

