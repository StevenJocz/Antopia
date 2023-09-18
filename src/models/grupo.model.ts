export interface Colonia {
    id_colonies: number;
    s_name: string;
    s_description: string;
    fk_tbl_user_creator: number;
    name_creator: string;
    photo_creator: string;
    url_creator: string;
    level_creator: number;
    dt_creation: string;
    s_photo: string;
    s_colors: string;
    cantidadMembers: number;
    esmember: number;
    userMembers: UserMember[];
}

interface UserMember {
    id_user: number;
    foto: string;
    nombre: string;
    urluser: string;
    level: number;
    siguiendo: number;
}