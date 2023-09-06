// const baseUrl = 'http://localhost:5239/api/';
const baseUrl = 'https://antopiaapi.azurewebsites.net/api/';
const characterUrl = baseUrl + 'Login/login';

// Esta función exportada, getIniciar, se encarga de enviar una solicitud POST a la URL characterUrl para iniciar sesión.
// Toma la dirección de correo electrónico y la contraseña del usuario como parámetros.
export const getIniciar = (userEmail: string, userPassword: string) => {
    const url = characterUrl;
    const body = JSON.stringify({ userEmail, userPassword });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};


// Esta función exportada, PostRecordarme, se encarga de enviar una solicitud POST para enviar un correo electrónico de restablecimiento de contraseña.
// Toma la dirección de correo electrónico del usuario como parámetro.
export const PostRecordarme = (userEmail: string) => {
    const url = baseUrl + 'Login/EmailRestablecimientoPassword';
    const body = JSON.stringify({
        para: userEmail,
        asunto: "Restablecimiento de contraseña",
        contenido: `<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Restablecimiento de contraseña</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f4f4f4;\n            color: #333;\n        }\n\n        .container {\n            max-width: 600px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1 {\n            color: #555;\n        }\n\n        p {\n            margin-bottom: 10px;\n        }\n\n        .code {\n            background-color: #f9f9f9;\n            border: 1px solid #ddd;\n            padding: 10px;\n            font-size: 20px;\n        }\n\n        .footer {\n            margin-top: 30px;\n            font-size: 14px;\n            color: #777;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>Código de seguridad para restablecer la contraseña</h1>\n        <p>Hola [Nombre],</p>\n        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Por favor, utiliza el siguiente código de seguridad:</p>\n        <div class=\"code\">[Código de seguridad]</div>\n        <p>Ingresa este código en la página de restablecimiento de contraseña para continuar con el proceso.</p>\n        <p>Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo electrónico.</p>\n        <p class=\"footer\">Atentamente,<br>El equipo de ejemplo</p>\n    </div>\n</body>\n</html>`
    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};


// Esta función exportada, PostEnviarCodigo, se encarga de enviar una solicitud POST para verificar un código de seguridad durante el proceso de restablecimiento de contraseña.
// Toma la dirección de correo electrónico y el código como parámetros.
export const PostEnviarCodigo = (userEmail: string, codigo: string) => {
    const url = baseUrl + 'Login/VerificarCodigo';
    const body = JSON.stringify({
        s_correo: userEmail,
        s_codigo: codigo

    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => res.json());
};


// Esta función exportada, PostActualizarPassword, se encarga de enviar una solicitud PUT para actualizar la contraseña del usuario.
// Toma la dirección de correo electrónico y la nueva contraseña como parámetros.
export const PostActualizarPassword = (userEmail: string, nuevoPassword: string) => {
    const url = `${baseUrl}Login/ActualizarPassword?userEmail=${encodeURIComponent(userEmail)}&nuevoPassword=${encodeURIComponent(nuevoPassword)}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
};

