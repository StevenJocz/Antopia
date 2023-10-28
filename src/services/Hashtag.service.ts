import axios from 'axios';
import { Hashtags } from "../models";
import { services } from "../models";

const baseUrl = services.local

export const gethashtag = async (texto: string) => {
    
    const encodedText = encodeURIComponent(texto); // Codifica el texto, incluyendo el carácter "#"
    const url = `${baseUrl}Pubication/SearchHashtags?searchTerm=${encodedText}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const hashtag: Hashtags[] = response.data.map((item: any) => ({
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


export const getTohashtag = async () => {
    
    
    const url = `${baseUrl}Pubication/TopHashtags`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const hashtag: Hashtags[] = response.data.map((item: any) => ({
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