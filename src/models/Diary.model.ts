
export interface Diarios {
    idPerfil: number;
    id: number;
    diario: string;
    Megustas: number;
    UserLikes: number;
    comentarios: number;
    registros: DiarioRegistro[];
    comentariosDiario: DiarioComentarios[];
}


export interface DiarioRegistro {
    idRegistro: number;
    idDiary: number;
    fecha: string;
    contenido: string;
    imagen: string[];
    base64: string[];
}

export interface DiarioComentarios {
    idDiario: number;
    idPerfilComentarios: number;
    fechaComentario: string;
    nombrePerfilComentarios: string;
    imagenPerfilComentarios: string;
    comentario: string;
    urlPerfil: string;

}


