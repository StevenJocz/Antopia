import React, { createContext, useContext, useState, useEffect } from 'react';
import { Publicacion } from '../models';
import { PostPublicacion } from '../services';

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
    const [objetoEjemplo, setObjetoEjemplo] = useState<Publicacion[]>([]);
    const baseUrl = 'http://localhost:5239/api/Pubication/TodoPublication';
    useEffect(() => {
        // Realiza una solicitud a la API para obtener las publicaciones iniciales
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

                // Actualiza el estado local con los datos mapeados de la API
                setObjetoEjemplo(objetoMapeado);
            })
            .catch((error) => {
                console.error('Error al obtener datos de la API', error);
            });
    }, []);

    const agregarPublicacion = async (nuevaPublicacion: Publicacion): Promise<void> => {
        const result = await PostPublicacion(nuevaPublicacion);
        if (result === true) {
            // Agregar nueva publicación al estado local
            const nuevasPublicaciones = [...objetoEjemplo, nuevaPublicacion];
            setObjetoEjemplo(nuevasPublicaciones);
        }
    };
   

    const agregarComentarioAPublicacion = (publicacionId: number, comentario: Comentario): void => {
        const updatedPublicaciones = objetoEjemplo.map(publicacion => {
            if (publicacion.IdPublicacion === publicacionId) {
                return {
                    ...publicacion,
                    Comentarios: [...publicacion.Comentarios, comentario],
                    CantidadComentarios: publicacion.CantidadComentarios + 1 // Incrementa la cantidad de comentarios
                };
            }
            return publicacion;
        });

        setObjetoEjemplo(updatedPublicaciones);
    };

    const contextValue: PublicacionesContextType = {
        publicaciones: objetoEjemplo,
        agregarPublicacion,
        agregarComentarioAPublicacion,
    };

    return (
        <PublicacionesContext.Provider value={contextValue}>
            {props.children}
        </PublicacionesContext.Provider>
    );
};
