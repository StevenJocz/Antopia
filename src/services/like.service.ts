import { services } from "../models";

const baseUrl = services.local

export const Postlike = (idPublicacion: number, islike: number, idUser: number) => {
    const url = baseUrl + 'Pubication/Like_Comentarios';
    const body = JSON.stringify({
        id_publication_like: 0,
        fk_tbl_user: idUser,
        fk_tbl_publication: idPublicacion,
        is_like: islike

    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};