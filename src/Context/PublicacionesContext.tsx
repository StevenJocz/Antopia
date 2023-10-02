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
    eliminarPublicacion: (publicacionId: number)=> void;
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
    idPerfil: number;
    idTipo: number;
    idColonia: number;
    opcion: number;
    hashtag: string;
}

export const PublicacionesProvider: React.FC<PublicacionesProviderProps> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
    const [contextUpdateCounter, setContextUpdateCounter] = useState<number>(0);

    useEffect(() => {
        async function fetchPublicaciones() {
            try {

                if (props.opcion === 1) {
                    const resultado = await getPublicaciones(userState.IdPerfil, props.opcion, 1, 'o');
                    setPublicaciones(resultado);
                }
                else if (props.opcion === 2) {
                    const resultado = await getPublicaciones(userState.IdPerfil, 2, props.idTipo, 'o');
                    setPublicaciones(resultado);
                }
                else if (props.opcion === 3) {
                    const resultado = await getPublicaciones(userState.IdPerfil, 3, props.idPerfil, 'o');
                    setPublicaciones(resultado);
                }
                else if (props.opcion === 4 && props.idColonia == 0) {
                    const resultado = await getPublicaciones(userState.IdPerfil, 4, props.idTipo, 'o');
                    const publicacionesFiltradas = resultado.filter((publicacion) => {
                        return publicacion.esMiembroColonia == 1;
                    });
                    setPublicaciones(publicacionesFiltradas);
                }
                
                else if (props.opcion === 4 && props.idColonia !== 0) {
                    const resultado = await getPublicaciones(userState.IdPerfil, 4, props.idTipo, 'o');
                    const publicacionesFiltradas = resultado.filter((publicacion) => {
                        return publicacion.IdColonia === props.idColonia;
                    });
                    console.log('entro aca')
                    setPublicaciones(publicacionesFiltradas);
                }
                else if (props.opcion === 5) {
                    const resultado = await getPublicaciones(userState.IdPerfil, 5, props.idTipo, props.hashtag);
                    setPublicaciones(resultado);
                }
                else if (props.opcion === 6) {
                    console.log('entro aqui');
                    const resultado = await getPublicaciones(userState.IdPerfil, 6, props.idColonia, props.hashtag);
                    setPublicaciones(resultado);
                }
                
            } catch (error) {
                console.error('Error al obtener publicaciones:', error);
            }
        }

        fetchPublicaciones();
    }, [props.idPerfil, props.idTipo, props.idColonia, userState.IdPerfil, contextUpdateCounter]);

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

    const eliminarPublicacion = (publicacionId: number): void => {
        const nuevasPublicaciones = publicaciones.filter((publicacion) => publicacion.IdPublicacion !== publicacionId);
        setPublicaciones(nuevasPublicaciones);
    };

    const contextValue: PublicacionesContextType = {
        publicaciones,
        agregarPublicacion,
        agregarComentarioAPublicacion,
        darLikeAPublicacion,
        listarPublicaciones,
        eliminarPublicacion,
    };

    return (
        <PublicacionesContext.Provider value={contextValue}>
            {props.children}
        </PublicacionesContext.Provider>
    );
};