import { services } from "../models";

const baseUrl = services.local;

export const PostRegistroColonia = (nombre: string, descripcion: string, iduser: number, foto: string, color: string) => {
    const url = baseUrl + 'Colonia/Create_Colonia';
    const body = JSON.stringify({

        "s_name": nombre,
        "s_description": descripcion,
        "fk_tbl_user_creator": iduser,
        "s_photo": foto,
        "s_colors": color,
    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};

export const getUserColonias = async (idUser: number) => {
    const url = `${baseUrl}Colonia/User_Colonias?idUser=${idUser}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener publicaciones: ${response.statusText}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        throw error;
    }
};


export const getMiColonia = async (idgrupo: number, idUser: number) => {
    const url = `${baseUrl}Colonia/Id_Colonias?idGrupo=${idgrupo}&idUser=${idUser}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener publicaciones: ${response.statusText}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        throw error;
    }
};


export const PostUnirmeColonia = (idcolonia: number, iduser: number, esMiembro: number) => {
    const url = baseUrl + 'Colonia/Unirme_Colonia';
    const body = JSON.stringify({

        "fk_tbl_colonies": idcolonia,
        "fk_tbl_user_members": iduser,
        "esMember": esMiembro
    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};

export const getBuscarColonia = async (palabra: string) => {
    const url = `${baseUrl}Colonia/Buscar_Colonias?colonia=${palabra}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener publicaciones: ${response.statusText}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        throw error;
    }
};


