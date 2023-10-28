import axios from 'axios';
import { Comentario } from "../models";
import { services } from "../models";

const baseUrl = services.local;

export const enviarcomentario = async (publicacionId: number, comentarioItem: Comentario) => { 
    const url = baseUrl + 'Pubication/Add_Comentarios';
    const token = localStorage.getItem('token');
    const data = {
        id_publication_comments: 0,
        fk_tbl_publication: publicacionId,
        fk_tbl_user: comentarioItem.IdPerfilComentarios,
        s_comments: comentarioItem.Comentario,
        dt_creation: '2023-09-07T01:43:34.673Z',
        imagen: comentarioItem.imagenComentario
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


export const enviarRespuestaComentario = async (comentarioId: number, comentarioItem: Comentario) => { 
    const url = baseUrl + 'Pubication/Add_Respuesta_Comentarios';
    const token = localStorage.getItem('token');
    const data = {
        id_publication_comments_answer: 0,
        fk_tbl_publication_comments: comentarioId,
        fk_tbl_user: comentarioItem.IdPerfilComentarios,
        s_answer: comentarioItem.Comentario,
        dt_creation: new Date().toISOString(),
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
