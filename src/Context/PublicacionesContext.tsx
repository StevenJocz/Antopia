import React, { createContext, useContext, useState } from 'react';
import { Publicacion } from "../models";
import { objetoEjemplo } from '../services';

interface Comentario {
    IdPerfilComentarios: number;
    NombrePerfilComentarios: string;
    ImagenPerfilComentarios: string;
    Comentario: string;
    urlPerfil: string;
    imagenComentario: string;
    FechaComentario: string;
    megustaComentarios: number;
}

interface PublicacionesContextType {
    publicaciones: Publicacion[];
    agregarPublicacion: (nuevaPublicacion: Publicacion) => void;
    agregarComentarioAPublicacion: (publicacionId: number, comentario: Comentario) => void;
}

const PublicacionesContext = createContext<PublicacionesContextType | undefined>(undefined);

export const usePublicaciones = (): PublicacionesContextType => {
    const context = useContext(PublicacionesContext);
    if (!context) {
        throw new Error('usePublicaciones debe ser utilizado dentro de un PublicacionesProvider');
    }
    return context;
};

interface PublicacionesProviderProps {
    children: React.ReactNode;
    idTipo: number | null;
    idPerfil: number | null;
}

export const PublicacionesProvider: React.FC<PublicacionesProviderProps> = (props) => {
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>(objetoEjemplo);

    const filterPublicaciones = (idPerfil: number | null, idTipo: number | null): Publicacion[] => {
        let filtradas = [...publicaciones];

        if (idPerfil !== null) {
            filtradas = filtradas.filter(publicacion => publicacion.IdPerfil === idPerfil);
        }

        if (idTipo !== null) {
            filtradas = filtradas.filter(publicacion => publicacion.IdTipo === idTipo);
        }
        return filtradas;
    };

    const objetoFiltrado = filterPublicaciones(props.idPerfil, props.idTipo);


    const agregarPublicacion = (nuevaPublicacion: Publicacion): void => {
        setPublicaciones([...publicaciones, nuevaPublicacion]);
    };

    const agregarComentarioAPublicacion = (publicacionId: number, comentario: Comentario): void => {
        const updatedPublicaciones = publicaciones.map(publicacion => {
            if (publicacion.IdPublicacion === publicacionId) {
                return {
                    ...publicacion,
                    Comentarios: [...publicacion.Comentarios, comentario],
                    CantidadComentarios: publicacion.CantidadComentarios + 1 // Incrementa la cantidad de comentarios
                };
            }
            return publicacion;
        });

        setPublicaciones(updatedPublicaciones);
    };

    const contextValue: PublicacionesContextType = {
        publicaciones: objetoFiltrado,
        agregarPublicacion,
        agregarComentarioAPublicacion,
    };

    return (
        <PublicacionesContext.Provider value={contextValue}>
            {props.children}
        </PublicacionesContext.Provider>
    );
};
