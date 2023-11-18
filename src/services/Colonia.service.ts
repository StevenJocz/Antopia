import axios from 'axios';
import { services } from "../models";

const baseUrl = services.local;

export const PostRegistroColonia = async (nombre: string, descripcion: string, iduser: number, foto: string, color: string) => {
    const url = baseUrl + 'Colonia/Create_Colonia';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({

        "s_name": nombre,
        "s_description": descripcion,
        "fk_tbl_user_creator": iduser,
        "s_photo": foto,
        "s_colors": color,
    });

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

export const getUserColonias = async (idUser: number) => {
    const url = `${baseUrl}Colonia/User_Colonias?idUser=${idUser}`;
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
        throw error;
    }
};


export const getMiColonia = async (idgrupo: number, idUser: number) => {
    const url = `${baseUrl}Colonia/Id_Colonias?idGrupo=${idgrupo}&idUser=${idUser}`;
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
        throw error;
    }
};


export const PostUnirmeColonia = async (idcolonia: number, iduser: number, esMiembro: number) => {
    const url = baseUrl + 'Colonia/Unirme_Colonia';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({

        "fk_tbl_colonies": idcolonia,
        "fk_tbl_user_members": iduser,
        "esMember": esMiembro
    });

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

export const getBuscarColonia = async (palabra: string) => {
    const url = `${baseUrl}Colonia/Buscar_Colonias?colonia=${palabra}`;
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
        throw error;
    }
};

export const getImagenesColonia = async (idColonia: number) => {
    const url = `${baseUrl}Colonia/ImagenesColoniasId?idColonia=${idColonia}`;
    //const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTopColonia = async () => {
    const url = `${baseUrl}Colonia/topColonias`;
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
        throw error;
    }
};


