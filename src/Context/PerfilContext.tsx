import React, { createContext, useContext, useState } from 'react';
import { InfoPerfil } from '../models';
import { getPerfil } from '../services/Perfil.service';

interface PerfilContextType {
    perfiles: InfoPerfil[];
    getPerfilById: (idPerfil: number) => InfoPerfil | undefined;
}

const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [perfiles] = useState<InfoPerfil[]>(getPerfil);
    const getPerfilById = (idPerfil: number) => {
        return perfiles.find(publicacion => publicacion.IdPerfil === idPerfil);
    };

    const contextValue: PerfilContextType = {
        perfiles,
        getPerfilById,
    };

    return (
        <PerfilContext.Provider value={contextValue}>
            {children}
        </PerfilContext.Provider>
    );
};

export const usePerfil = () => {
    const context = useContext(PerfilContext);
    if (!context) {
        throw new Error('usePerfil debe ser utilizado dentro de un PerfilProvider');
    }
    return context;
};
