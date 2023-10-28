import axios from 'axios';
import { Publicacion,  services } from "../models";

const baseUrl = services.local

export const PostPublicacion = async (Publicacion: Publicacion) => {
    const url = baseUrl + 'Pubication/Create_Publication';
    const token = localStorage.getItem('token');
    const datosPublicacion = {
        publicaciones: [
            {
                id_publication: 0, 
                dt_creation: new Date().toISOString(), // Fecha actual en formato ISO
                s_title: Publicacion.Titulo,
                s_content: Publicacion.Contenido,
                fk_tbl_user: Publicacion.IdPerfil,
                fk_tbl_type_publication: Publicacion.IdTipo,
                s_hashtags: Publicacion.hashtags,
                fk_tbl_colinie:Publicacion.IdColonia
            },
        ],
        imagenes: Publicacion.base64.map((imagen, index) => ({
            id_publication_image: 0, 
            date_creation: new Date().toISOString(), // Fecha actual en formato ISO
            fk_tbl_publication: index, 
            s_location: imagen,
            fk_tbl_user: Publicacion.IdPerfil,
        })),
        videos: Publicacion.UrlYoutube ? [
            {
                id_publication_video: 0, 
                date_creation: new Date().toISOString(), // Fecha actual en formato ISO
                fk_tbl_publication: 0, 
                s_url: Publicacion.UrlYoutube,
            }
        ] : [],
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
