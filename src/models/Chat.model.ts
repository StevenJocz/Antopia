export interface chat {
    message_id?: number;
    de: number;
    para: number;
    message: string;
    id_Grupo: number;
    general: number;
    fecha: string;
    hora: string;
    leido?: boolean;
    nuevo?: number;
    usuario?: string;
    foto_usuario? : string;
    id: number;
    imagenes: { img: string }[];
}
