import { Comentario } from "../models";
import { services } from "../models";

const baseUrl = services.local + 'Pubication/Add_Comentarios';

export const enviarcomentario = async (publicacionId: number, comentarioItem: Comentario) => { 
    const url = baseUrl;

    const data = {
        id_publication_comments: 0,
        fk_tbl_publication: publicacionId,
        fk_tbl_user: comentarioItem.IdPerfilComentarios,
        s_comments: comentarioItem.Comentario,
        dt_creation: '2023-09-07T01:43:34.673Z',
        imagen: comentarioItem.imagenComentario
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura y muestra el cuerpo de la respuesta de la API
            console.error('Error al enviar el comentario a la API:', errorData);
            throw new Error('La solicitud a la API no fue exitosa.');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error en la función enviarcomentario:', error);
        throw error;
    }
};
