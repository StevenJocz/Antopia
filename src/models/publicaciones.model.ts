

export interface Comentario {
    IdComentarios: number;
    IdResponse: number;
    IdPerfilComentarios: number;
    FechaComentario: string;
    NombrePerfilComentarios: string;
    ImagenPerfilComentarios: string;
    Comentario: string;
    imagenComentario: string;
    megustaComentarios: number;
    urlPerfil: string;
    UserLikes: number;
    comentariosRespuesta: Comentario[];
}

export interface Publicacion {
    IdPerfil: number;
    NombrePerfil: string;
    urlPerfil: string;
    ImagenPerfil: string;
    UserLikes: number;
    Level: number;
    IdPublicacion: number;
    IdTipo: number;
    IdColonia: number;
    esMiembroColonia: number;
    Megustas: number;
    CantidadComentarios: number;
    Siguiendo: number;
    FechaPublicacion: string;
    Titulo: string;
    Contenido: string;
    UrlYoutube: string | null;
    ImagenesPublicacion: string[];
    base64: string[];
    hashtags: string;
    Comentarios: Comentario[];
}


export interface Hashtags {
    Hashtag: string;
    NumeroPublicaciones: number;
}

export interface PublicacionBuscador {
    NombrePerfil: string;
    ImagenPerfil: string;
    IdPublicacion: number;
    IdTipo: number;
    FechaPublicacion: string;
    Titulo: string;
    Contenido: string;
}


export interface PublicacionReportinRazon {
    idRazon: string;
    titulo: string;
    description: string;
}
