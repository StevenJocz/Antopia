import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

interface RegistroEntry {
    fecha: string;
    contenido: string;
}

interface DiarioEntry {
    id: number;
    diario: string;
    registros: RegistroEntry[];
}

interface DiarioContextProps {
    diarioData: DiarioEntry[];
    agregarDiario: (nuevoDiario: DiarioEntry) => void;
    agregarRegistro: (idDiario: number, nuevoRegistro: RegistroEntry) => void;
    lastDiarioId: number;
}

const DiarioContext = createContext<DiarioContextProps | undefined>(undefined);

export const useDiarioContext = () => {
    const context = useContext(DiarioContext);
    if (!context) {
        throw new Error('useDiarioContext debe ser utilizado dentro de un DiarioProvider');
    }
    return context;
};

export const DiarioProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const defaultDiarioData: DiarioEntry[] = [
        {
            id: 1,
            diario: "Diario de Hormigas",
            registros: [
                {
                    fecha: "2023-08-23",
                    contenido: "Hoy he comenzado a observar el comportamiento de mis hormigas en su nuevo hábitat. Después de introducirlas en el terrario, parecían estar explorando activamente...",
                },
                {
                    fecha: "2023-08-17",
                    contenido: "Las hormigas han establecido un sendero definido hacia las migas de pan que coloqué ayer. Parece que están utilizando feromonas para marcar el camino..."
                },
                {
                    fecha: "2023-08-18",
                    contenido: "Hoy he introducido una pequeña cantidad de azúcar en el terrario para ver cómo reaccionan las hormigas. Inmediatamente, las hormigas obreras descubrieron..."
                },
                {
                    fecha: "2023-08-19",
                    contenido: "He notado una distinción entre las hormigas obreras en función de su tamaño y comportamiento. Algunas hormigas más grandes están transportando las migas..."
                },
                {
                    fecha: "2023-08-20",
                    contenido: "Las hormigas han ampliado sus excavaciones en el sustrato y han creado un sistema de túneles más elaborado. Están trayendo materiales del exterior..."
                },
                {
                    fecha: "2023-08-21",
                    contenido: "Hoy he observado una interacción interesante entre las hormigas y una intrusa araña que entró en el terrario. Las hormigas obreras se unieron rápidamente..."
                }

            ],
        },
        {
            id: 2,
            diario: "Diario de OtraEspecie",
            registros: [
                {
                    fecha: "2023-08-23",
                    contenido: "Hoy he comenzado a observar el comportamiento de una nueva especie en su hábitat. Estoy emocionado por aprender más sobre sus interacciones y hábitos...",
                },
                {
                    fecha: "2023-08-24",
                    contenido: "Las criaturas han mostrado un comportamiento inusual hoy. Parecen estar recolectando objetos brillantes y llevándolos a su nido."
                }
            ],
        },
    ];

    const [diarioData, setDiarioData] = useState<DiarioEntry[]>(defaultDiarioData);
    const [lastDiarioId, setLastDiarioId] = useState<number>(defaultDiarioData.length);

    const agregarDiario = (nuevoDiario: DiarioEntry) => {
        setDiarioData([...diarioData, nuevoDiario]);
        setLastDiarioId(lastDiarioId + 1);
    };

    const agregarRegistro = (idDiario: number, nuevoRegistro: RegistroEntry) => {
        const updatedDiarioData = diarioData.map(diario => {
            if (diario.id === idDiario) {
                return {
                    ...diario,
                    registros: [...diario.registros, nuevoRegistro],
                };
            }
            return diario;
        });

        setDiarioData(updatedDiarioData);
    };

    return (
        <DiarioContext.Provider value={{ diarioData, agregarDiario, agregarRegistro, lastDiarioId }}>
            {children}
        </DiarioContext.Provider>
    );
};
