import axios from 'axios';
import { DiarioComentarios, DiarioRegistro, Diarios, services } from "../models";
const baseUrl = services.local

export const getUserDiarios = async (idUser: number, userConsulta: number) => {
    const url = `${baseUrl}Diary/ListarDiarios?idUser=${idUser}&userConsulta=${userConsulta}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const diario: Diarios[] = response.data.map((item: any) => ({
            id: item.id,
            idPerfil: item.idPerfil,
            diario: item.diario,
            Megustas: item.megustas,
            UserLikes: item.userLikes,
            comentarios: item.comentarios,
            registros: item.registros,
            comentariosDiario :item.comentariosDiary

        }));

        return diario;
    } catch (error) {
        throw error;
    }
};

export const PostRegistrarDiario = async(idUser: number, nombre: string) => {
    const url = baseUrl + 'Diary/RegistrarDiario';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({

        "fk_tbl_user": idUser,
        "s_name": nombre
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



export const PostAddRegistroDiario = async (diarioRegistro: DiarioRegistro) => {
    const url = baseUrl + 'Diary/AddRegistroDiario';
    const token = localStorage.getItem('token');

    const datosPublicacion = {
        "diaryEntries": [
            {
                "fk_tbl_diary": diarioRegistro.idDiary,
                "s_content": diarioRegistro.contenido,
                "dt_creation": new Date(diarioRegistro.fecha).toISOString(),
            }
        ],

        "imagenes": diarioRegistro.base64.map((imagen) => ({ 
            "s_location": imagen,
        })),
    };

    const data = JSON.stringify(datosPublicacion);

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

export const PostlikeDiary = async(idDiary: number, islike: number, idUser: number) => {
    const token = localStorage.getItem('token');
    const url = baseUrl + 'Diary/likeDiary';
    const data = JSON.stringify({
        fk_tbl_user : idUser,
        fk_tbl_diary: idDiary,
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

export const enviarcomentarioDiario = async (IdDiario: number, comentarioItem: DiarioComentarios) => { 
    const url = baseUrl + 'Diary/RegistrarComentarios';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({
        id_diary_comments: 0,
        fk_tbl_diary: IdDiario,
        fk_tbl_user: comentarioItem.idPerfilComentarios,
        s_comments: comentarioItem.comentario,
        dt_creation: new Date(comentarioItem.fechaComentario).toISOString()
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
