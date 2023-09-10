import { services } from "../models";
const baseUrl = services.local;

interface userData {
    id: number;
    s_user_name: string;
    dt_user_birthdate: string;
    s_user_gender: string;
    fk_user_address_city: number;
    s_user_cellphone: string;
    s_user_email: string;
    s_userProfile: string;
    s_userPhoto: string;
    s_userFrontpage: string;
    s_frase: string;
    fk_tblRol: number;
    fk_tbl_level: number;
}

export const PostRegistrarUser = async (userData: userData) => {
    const url = baseUrl + 'User/Create_User';

    const body = JSON.stringify(userData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        const result = await response.json();
        return result;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};

export const PostActualizarDatos = (idUser: string, tipo: string, dato: string) => {
    const url = `${baseUrl}User/ActualizrDatos`;

    const requestData = {
        idUser: idUser,
        tipo: tipo,
        dato: dato
    };

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    }).then(res => res.json());
}

export const PostFollowers = (idUser: number, id_follower: number, isfollower: number) => {
    const url = `${baseUrl}User/Followers_User`;

    const requestData = {
        id_followers: 0,
        id_user: idUser,
        id_follower: id_follower,
        isfollower: isfollower
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    }).then(res => res.json());
}

