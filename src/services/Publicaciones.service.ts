// getPublicaciones.ts
import { Publicacion, PublicacionBuscador, services } from "../models";

const baseUrl = services.local

export const getPublicaciones = async (iduser: number): Promise<Publicacion[]> => {

    const url = `${baseUrl}Pubication/TodoPublication?iduser=${iduser}`;

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