import { Publicacion,  services } from "../models";

const baseUrl = services.local

export const PostPublicacion = async (Publicacion: Publicacion) => {

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

    const url = baseUrl + 'Pubication/Create_Publication';

    const body = JSON.stringify(datosPublicacion);
    console.log(body);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        const result = await response.json();
        if (result.resultado === false) {
            return false;

        }else { 
            return true;
        
        }
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};
