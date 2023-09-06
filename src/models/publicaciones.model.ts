

export interface Comentario {
    IdPerfilComentarios: number;
    FechaComentario: string;
    NombrePerfilComentarios: string;
    ImagenPerfilComentarios: string;
    Comentario: string;
    imagenComentario: string;
    megustaComentarios: number;
    urlPerfil: string;
}

export interface Publicacion {
    IdPerfil: number;
    NombrePerfil: string;
    urlPerfil: string;
    ImagenPerfil: string;
    IdPublicacion: number;
    IdTipo: number;
    Megustas: number;
    CantidadComentarios: number;
    FechaPublicacion: string;
    Titulo: string;
    Contenido: string;
    UrlYoutube: string | null;
    ImagenesPublicacion: string[];
    base64: string[];
    Comentarios: Comentario[];
}
