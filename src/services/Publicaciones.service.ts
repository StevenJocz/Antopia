
import axios from 'axios';
import { Publicacion, PublicacionBuscador, PublicacionReportinRazon, services } from "../models";

const baseUrl = services.local

export const getPublicaciones = async (iduser: number, tipo: number, parametro: number, hashtags: string): Promise<Publicacion[]> => {
    const token = localStorage.getItem('token');
    const url = `${baseUrl}Pubication/TodoPublication?iduser=${iduser}&tipo=${tipo}&parametro=${parametro}&hashtags=${hashtags}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const objetoMapeado: Publicacion[] = response.data.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            Level: item.level,
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
                IdComentarios: comentarioItem.idComentarios,
                IdPerfilComentarios: comentarioItem.idPerfilComentarios,
                FechaComentario: comentarioItem.fechaComentario,
                NombrePerfilComentarios: comentarioItem.nombrePerfilComentarios,
                ImagenPerfilComentarios: comentarioItem.imagenPerfilComentarios,
                Comentario: comentarioItem.comentario,
                imagenComentario: comentarioItem.imagenComentario,
                megustaComentarios: comentarioItem.megustaComentarios,
                urlPerfil: comentarioItem.urlPerfil,
                UserLikes: comentarioItem.userLike,
                comentariosRespuesta: comentarioItem.comentariosRespuesta.map((comentarioResponseItem: any) => ({
                    IdComentarios: comentarioResponseItem.idComentarios,
                    IdResponse: comentarioResponseItem.idResponse,
                    IdPerfilComentarios: comentarioResponseItem.idPerfilComentarios,
                    FechaComentario: comentarioResponseItem.fechaComentario,
                    NombrePerfilComentarios: comentarioResponseItem.nombrePerfilComentarios,
                    ImagenPerfilComentarios: comentarioResponseItem.imagenPerfilComentarios,
                    Comentario: comentarioResponseItem.comentario,
                    megustaComentarios: comentarioResponseItem.megustaComentarios,
                    urlPerfil: comentarioResponseItem.urlPerfil,
                    UserLikes: comentarioResponseItem.userLike,
                })),
            })),
            InfoColonia: item.infoColonia.map((coloniaItem: any) => ({
                id_colonies: coloniaItem.id_colonies,
                s_name: coloniaItem.s_name,
                s_photo: coloniaItem.s_photo,
                points: coloniaItem.colors,

            })),
        }));

        return objetoMapeado;
    } catch (error) {
        throw error;
    }
};


export const getPublicacionesBuscador = async (texto: string) => {

    const url = `${baseUrl}Pubication/buscarPublicaciones?searchTerm=${texto}`;
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const pubicacion: PublicacionBuscador[] = response.data.map((item: any) => ({
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
        throw error;
    }
};


export const getPublicacionesHashtag = async (idUser: number, texto: string): Promise<Publicacion[]> => {
    const token = localStorage.getItem('token');
    const encodedText = encodeURIComponent(texto);
    const url = `${baseUrl}Pubication/TodoPublicationHashtags?idUser=${idUser}&hashtags=${encodedText}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const objetoMapeado: Publicacion[] = response.data.map((item: any) => ({
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
        throw error;
    }
};


export const getPublicacionesReportingRazon = async () => {
    const token = localStorage.getItem('token');
    const url = `${baseUrl}Pubication/Publication_reporting_reason`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const razones: PublicacionReportinRazon[] = response.data.map((item: any) => ({
            idRazon: item.id_publication_reporting_reason,
            titulo: item.s_title,
            description: item.s_description,
        }));

        return razones;
    } catch (error) {
        throw error;
    }
};


export const PostPublicacionesReporting = async (idRazon: number, idPublicacion: number) => {
    const url = baseUrl + 'Pubication/PublicationReportin';
    const token = localStorage.getItem('token');
    const data = JSON.stringify({

        "fk_tbl_publication_reporting_reason": idRazon,
        "fk_tbl_publication": idPublicacion
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

export const deletePostPublicacion = async(idPublicacion: number) => {
    const token = localStorage.getItem('token');
    const url = `${baseUrl}Pubication/Delete_Publication?idPublication=${idPublicacion}`;

    try {
        const response = await axios.delete(url, {
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