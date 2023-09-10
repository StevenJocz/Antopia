
import { Hashtags } from "../models";
import { services } from "../models";

const baseUrl = services.local

export const gethashtag = async (texto: string) => {
    
    const encodedText = encodeURIComponent(texto); // Codifica el texto, incluyendo el carácter "#"
    const url = `${baseUrl}Pubication/SearchHashtags?searchTerm=${encodedText}`;
    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const result = await response.json();
        
        const hashtag: Hashtags[] = result.map((item: any) => ({
            Hashtag: item.hashtag,
            NumeroPublicaciones: item.count,
        }));
        
        return hashtag;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error en la solicitud:', error);
        throw error;
    }
};
