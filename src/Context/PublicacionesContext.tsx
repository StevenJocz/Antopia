// PublicacionesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { getPublicaciones, getPublicacionesHashtag} from '../services/Publicaciones.service';
import { PostPublicacion, enviarcomentario, Postlike } from '../services';
import { Publicacion } from '../models';

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
    agregarPublicacion: (nuevaPublicacion: Publicacion) => Promise<void>;
    agregarComentarioAPublicacion: (publicacionId: number, comentario: Comentario) => void;
    darLikeAPublicacion: (publicacionId: number, isLike: number, idPerfil: number) => Promise<void>;
    listarPublicaciones: (idPerfil: number, texto: string) => Promise<Publicacion[]>;
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
    idPerfil: number | null;
    idTipo: number | null;
}

export const PublicacionesProvider: React.FC<PublicacionesProviderProps> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [contextUpdateCounter, setContextUpdateCounter] = useState<number>(0); // Nuevo estado

    useEffect(() => {
        async function fetchPublicaciones() {
            try {
                const resultado = await getPublicaciones(userState.IdPerfil);
                const publicacionesFiltradas = resultado.filter((publicacion) => {
                    if (props.idPerfil === null && props.idTipo === null) {
                        return true;
                    }
                    if (props.idPerfil === null && props.idTipo !== null) {
                        return publicacion.IdTipo === props.idTipo;
                    }
                    if (props.idTipo === null && props.idPerfil !== null) {
                        return publicacion.IdPerfil === props.idPerfil;
                    }
                    return (
                        publicacion.IdPerfil === props.idPerfil && publicacion.IdTipo === props.idTipo
                    );
                });
                setPublicaciones(publicacionesFiltradas);
            } catch (error) {
                console.error('Error al obtener publicaciones:', error);
            }
        }

        fetchPublicaciones();
    }, [props.idPerfil, props.idTipo, userState.IdPerfil, contextUpdateCounter]); // Agrega contextUpdateCounter a las dependencias

    const agregarPublicacion = async (nuevaPublicacion: Publicacion): Promise<void> => {
        try {
            const result = await PostPublicacion(nuevaPublicacion);
            if (result) {
                const nuevasPublicaciones = [...publicaciones, nuevaPublicacion];
                setPublicaciones(nuevasPublicaciones);
                // Incrementa contextUpdateCounter cuando se agrega una publicación
                setContextUpdateCounter((prevCounter) => prevCounter + 1);
            }
        } catch (error) {
            console.error('Error al agregar la publicación:', error);
        }
    };

    const agregarComentarioAPublicacion = async (publicacionId: number, comentario: Comentario): Promise<void> => {
        try {
            await enviarcomentario(publicacionId, comentario);
            const updatedPublicaciones = publicaciones.map((publicacion) => {
                if (publicacion.IdPublicacion === publicacionId) {
                    return {
                        ...publicacion,
                        Comentarios: [...publicacion.Comentarios, comentario],
                        CantidadComentarios: publicacion.CantidadComentarios + 1,
                    };
                }
                return publicacion;
            });
            setPublicaciones(updatedPublicaciones);
            // Incrementa contextUpdateCounter cuando se agrega un comentario
            setContextUpdateCounter((prevCounter) => prevCounter + 1);
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
        }
    };

    const darLikeAPublicacion = async (publicacionId: number, isLike: number, idPerfil: number): Promise<void> => {
        try {
            console.log('publicacionId:', publicacionId, 'like:', isLike, 'idPerfil:', idPerfil, );
            await Postlike(publicacionId, isLike, idPerfil);
            const updatedPublicaciones = publicaciones.map((publicacion) => {
                if (publicacion.IdPublicacion === publicacionId) {
                    return {
                        ...publicacion,
                        Megustas: isLike === 0 ? publicacion.Megustas + 1 : publicacion.Megustas - 1,
                        UserLikes: isLike === 0 ? 1 : 0,
                    };
                }
                return publicacion;
            });
            setPublicaciones(updatedPublicaciones);
            // Incrementa contextUpdateCounter cuando se da like a una publicación
            setContextUpdateCounter((prevCounter) => prevCounter + 1);
        } catch (error) {
            console.error('Error al dar like a la publicación:', error);
        }
    };

    const listarPublicaciones = async (idPerfil: number, texto: string): Promise<Publicacion[]> => {
        try {
            const resultado = await getPublicacionesHashtag(idPerfil, texto); 
            setPublicaciones(resultado);
            return resultado; 
        } catch (error) {
            console.error('Error al listar publicaciones:', error);
            throw error; 
        }
    };

    const contextValue: PublicacionesContextType = {
        publicaciones,
        agregarPublicacion,
        agregarComentarioAPublicacion,
        darLikeAPublicacion,
        listarPublicaciones,
    };

    return (
        <PublicacionesContext.Provider value={contextValue}>
            {props.children}
        </PublicacionesContext.Provider>
    );
};