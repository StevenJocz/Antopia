// getPublicaciones.ts
import { Publicacion, PublicacionBuscador, PublicacionReportinRazon, services } from "../models";

const baseUrl = services.local

export const getPublicaciones = async (iduser: number, tipo: number, parametro: number, hashtags:string): Promise<Publicacion[]> => {

    const url = `${baseUrl}Pubication/TodoPublication?iduser=${iduser}&tipo=${tipo}&parametro=${parametro}&hashtags=${hashtags}`;
    console.log(url);
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
        const objetoMapeado: Publicacion[] = result.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            Level: item. level,
            IdPublicacion: item.idPublicacion,
            UserLikes: item.userLike,
            IdTipo: item.idTipo,
            IdColonia: item.idColonia,
            esMiembroColonia: item.esMiembroColonia,
            Megustas: item.megustas,
            CantidadComentarios: item.cantidadComentarios,
            Siguiendo: item.siguiendo,
            FechaPublicacion: item.fechaPublicacion,
            Titulo: item.titulo,
            Contenido: item.contenido,
            UrlYoutube: item.urlYoutube,
            ImagenesPublicacion: item.imagenesPublicacion,
            Comentarios: item.comentarios.map((comentarioItem: any) => ({
                IdPerfilComentarios: comentarioItem.idPerfilComentarios,
                FechaComentario: comentarioItem.fechaComentario,
                NombrePerfilComentarios: comentarioItem.nombrePerfilComentarios,
                ImagenPerfilComentarios: comentarioItem.imagenPerfilComentarios,
                Comentario: comentarioItem.comentario,
                imagenComentario: comentarioItem.imagenComentario,
                megustaComentarios: comentarioItem.megustaComentarios,
                urlPerfil: comentarioItem.urlPerfil,
            })),
        }));

        return objetoMapeado;
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        throw error;
    }
};


export const getPublicacionesBuscador = async (texto: string) => {

    const url = `${baseUrl}Pubication/buscarPublicaciones?searchTerm=${texto}`;
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

        const pubicacion: PublicacionBuscador[] = result.map((item: any) => ({
            NombrePerfil: item.nombrePerfil,
            ImagenPerfil: item.imagenPerfil,
            IdPublicacion: item.idPublicacion,
            IdTipo: item.idTipo,
            FechaPublicacion: item.fechaPublicacion,
            Titulo: item.titulo,
            Contenido: item.contenido,
        }));

        return pubicacion;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error en la solicitud:', error);
        throw error;
    }
};


export const getPublicacionesHashtag = async (idUser: number, texto: string): Promise<Publicacion[]> => {

   
    const encodedText = encodeURIComponent(texto);
    const url = `${baseUrl}Pubication/TodoPublicationHashtags?idUser=${idUser}&hashtags=${encodedText}`;
    
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
        const objetoMapeado: Publicacion[] = result.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            IdPublicacion: item.idPublicacion,
            UserLikes: item.userLike,
            IdTipo: item.idTipo,
            Megustas: item.megustas,
            CantidadComentarios: item.cantidadComentarios,
            Siguiendo: item.siguiendo,
            FechaPublicacion: item.fechaPublicacion,
            Titulo: item.titulo,
            Contenido: item.contenido,
            UrlYoutube: item.urlYoutube,
            ImagenesPublicacion: item.imagenesPublicacion,
            Comentarios: item.comentarios.map((comentarioItem: any) => ({
                IdPerfilComentarios: comentarioItem.idPerfilComentarios,
                FechaComentario: comentarioItem.fechaComentario,
                NombrePerfilComentarios: comentarioItem.nombrePerfilComentarios,
                ImagenPerfilComentarios: comentarioItem.imagenPerfilComentarios,
                Comentario: comentarioItem.comentario,
                imagenComentario: comentarioItem.imagenComentario,
                megustaComentarios: comentarioItem.megustaComentarios,
                urlPerfil: comentarioItem.urlPerfil,
            })),
        }));

        return objetoMapeado;
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        throw error;
    }
};


export const getPublicacionesReportingRazon = async () => {

    const url = `${baseUrl}Pubication/Publication_reporting_reason`;
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

        const razones: PublicacionReportinRazon[] = result.map((item: any) => ({
            idRazon: item.id_publication_reporting_reason,
            titulo: item.s_title,
            description: item.s_description,
        }));

        return razones;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error en la solicitud:', error);
        throw error;
    }
};


export const PostPublicacionesReporting = (idRazon: number, idPublicacion: number) => {
    const url = baseUrl + 'Pubication/PublicationReportin';
    const body = JSON.stringify({

        "fk_tbl_publication_reporting_reason": idRazon,
        "fk_tbl_publication": idPublicacion
    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};

export const deletePostPublicacion = (idPublicacion: number) => {
   
    const url = `${baseUrl}Pubication/Delete_Publication?idPublication=${idPublicacion}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());
};