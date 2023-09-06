import { Publicacion } from "../models";

// Define el objetoEjemplo inicial vacío
export const objetoEjemplo: Publicacion[] = [];

// URL de la API a la que deseas hacer la solicitud

// const baseUrl = 'http://localhost:5239/api/Pubication/TodoPublication';
const baseUrl = 'https://antopiaapi.azurewebsites.net/api/Pubication/TodoPublication';

fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
        // Mapea los datos de la API al modelo Publicacion
        const objetoMapeado: Publicacion[] = data.map((item: any) => ({
            IdPerfil: item.idPerfil,
            NombrePerfil: item.nombrePerfil,
            urlPerfil: item.urlPerfil,
            ImagenPerfil: item.imagenPerfil,
            IdPublicacion: item.idPublicacion,
            IdTipo: item.idTipo,
            Megustas: item.megustas,
            CantidadComentarios: item.cantidadComentarios,
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

        // Actualiza el objetoEjemplo con los datos mapeados de la API
        objetoEjemplo.length = 0;
        Array.prototype.push.apply(objetoEjemplo, objetoMapeado);
    })
    .catch((error) => {
        console.error('Error al obtener datos de la API', error);
    });




