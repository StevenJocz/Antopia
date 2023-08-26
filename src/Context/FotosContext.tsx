// FotosContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { getImagenes } from '../services/fotos.service';

type ImageUrlsType = string[];


const ImageUrlsContext = createContext<ImageUrlsType | undefined>(undefined);


export const ImageUrlsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [imageUrls] = useState<ImageUrlsType>(getImagenes(1));

    return <ImageUrlsContext.Provider value={imageUrls}>{children}</ImageUrlsContext.Provider>;
};

export const useImageUrls = () => {
    const context = useContext(ImageUrlsContext);
    if (context === undefined) {
        throw new Error('useImageUrls debe usarse dentro de un ImageUrlsProvider');
    }
    return context;
};
