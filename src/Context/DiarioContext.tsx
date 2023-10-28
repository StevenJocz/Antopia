import React, { createContext, useContext, useState, useEffect } from 'react';
import { PostAddRegistroDiario, PostRegistrarDiario, PostlikeDiary, enviarcomentarioDiario, getUserDiarios } from '../services';
import { Diarios, DiarioRegistro, DiarioComentarios } from '../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';

interface DiarioContextProps {
    diarioData: Diarios[];
    agregarDiario: (nuevoDiario: Diarios) => Promise<void>;
    agregarRegistro: (idDiario: number, nuevoRegistro: DiarioRegistro) => Promise<void>;
    darLikeDiary: (DiaryId: number, isLike: number, idPerfil: number) => Promise<void>;
    agregarComentarioDiario: (DiaryId: number, comentario: DiarioComentarios) => void;
}

interface Props {
    children: React.ReactNode;
    idPerfil: number
}

const DiarioContext = createContext<DiarioContextProps | undefined>(undefined);

export const useDiarioContext = () => {
    const context = useContext(DiarioContext);
    if (!context) {
        throw new Error('useDiarioContext debe ser utilizado dentro de un DiarioProvider');
    }
    return context;
};

export const DiarioProvider: React.FC<Props> = (props) => {
    const userState = useSelector((store: AppStore) => store.user);
    const [diarioData, setDiarioData] = useState<Diarios[]>([]);

    useEffect(() => {
        async function fetchDiarios() {
            try {
                const diarios = await getUserDiarios(props.idPerfil, userState.IdPerfil);
                setDiarioData(diarios);
            } catch (error) {
                setDiarioData([]);
                console.error('Error al obtener los diarios:', error);
            }
        }

        fetchDiarios();
    }, [props.idPerfil]);

    const agregarDiario = async (nuevoDiario: Diarios) => {

        try {
            const result = await PostRegistrarDiario(nuevoDiario.idPerfil, nuevoDiario.diario);
            if (result) {
                const NuevoDiario = [...diarioData, nuevoDiario];
                setDiarioData(NuevoDiario);
            }else {

            }
        } catch (error) {
            console.error('Error al agregar el nuevo diario:', error);
            
        }
    };
    
    const agregarRegistro = async (idDiario: number, nuevoRegistro: DiarioRegistro) => {
        try {
            const result = await PostAddRegistroDiario(nuevoRegistro);
            if (result) {

                const updatedPublicaciones = diarioData.map((diario) => {
                    if (diario.id == idDiario) {
                        return {
                            ...diario,
                            registros: [...diario.registros, nuevoRegistro]
                        };
                    }
                    return diario;
                });

                setDiarioData(updatedPublicaciones);
            }
        } catch (error) {
            console.error('Error al agregar el registro del diario:', error);
        }
    };

    const darLikeDiary = async (DiaryId: number, isLike: number, idPerfil: number): Promise<void> => {
        try {
            await PostlikeDiary(DiaryId, isLike, idPerfil);
            const updatedPublicaciones = diarioData.map((diario) => {
                if (diario.id === DiaryId) {
                    return {
                        ...diario,
                        Megustas: isLike === 0 ? diario.Megustas + 1 : diario.Megustas - 1,
                        UserLikes: isLike === 0 ? 1 : 0,
                    };
                }
                return diario;
            });
            setDiarioData(updatedPublicaciones);

        } catch (error) {
            console.error('Error al dar like a la publicación:', error);
        }
    };

    const agregarComentarioDiario = async (IdDiario: number, comentario: DiarioComentarios): Promise<void> => {
        try {
            await enviarcomentarioDiario(IdDiario, comentario);
            const updatedPublicaciones = diarioData.map((diario) => {
                if (diario.id === IdDiario) {
                    return {
                        ...diario,
                        comentariosDiario: [...diario.comentariosDiario, comentario],
                        comentarios: diario.comentarios + 1,
                    };
                }
                return diario;
            });
            setDiarioData(updatedPublicaciones);
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
        }
    };


    const contextValue: DiarioContextProps = {
        diarioData,
        agregarDiario,
        agregarRegistro,
        darLikeDiary,
        agregarComentarioDiario
    };

    return (
        <DiarioContext.Provider value={contextValue}>
            {props.children}
        </DiarioContext.Provider>
    );
};
