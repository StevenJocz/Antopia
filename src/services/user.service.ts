const baseUrl = 'http://localhost:5239/api/';

interface userData {
    id: number;
    s_user_name: string;
    dt_user_birthdate: string;
    s_user_gender: string;
    fk_user_address_city: number;
    s_user_cellphone: string;
    s_user_email: string;
    s_userProfile: string;
    s_userPhoto: string;
    s_userFrontpage: string;
    fk_tblRol: number;
  }

  export const PostRegistrarUser = async (userData: userData) => {
    const url = baseUrl + 'User/Create_User';

    const body = JSON.stringify(userData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        const result = await response.json();
        return result;
    } catch (error) {
        // Manejo de errores aquí
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};
