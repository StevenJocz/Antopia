import axios from 'axios';
import { services } from "../models";

const baseUrl = services.local

export const Postlike = async (idPublicacion: number, islike: number, idUser: number) => {
    const url = baseUrl + 'Pubication/Like_Comentarios';
    const token = localStorage.getItem('token');
    const data = {
        id_publication_like: 0,
        fk_tbl_user: idUser,
        fk_tbl_publication: idPublicacion,
        is_like: islike
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


export const PostlikeComentario = async (idComentarios: number, islike: number, idUser: number) => {
    const url = baseUrl + 'Pubication/likeComments';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({
        id_publication_comments_like: 0,
        fk_tbl_user: idUser,
        fk_tbl_publication_comments: idComentarios,
        is_like: islike
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



export const PostlikeComentarioRespuesta = async (idRespuesta: number, islike: number, idUser: number) => {
    const url = baseUrl + 'Pubication/likeAnswers';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({
        id_publication_comments_answer_like: 0,
        fk_tbl_user: idUser,
        fk_tbl_publication_comments_answer: idRespuesta,
        is_like: islike
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