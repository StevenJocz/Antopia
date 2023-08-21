
import { Publicacion } from "../models";

export const objetoEjemplo: Publicacion[] = [
    {
        IdPerfil: 1,
        NombrePerfil: "Steven Jocz",
        urlPerfil: "StevenJocz",
        ImagenPerfil: "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/314705105_10228152313408874_7614173374178368106_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHrFUe5yEcf076YPlW78sHT4KBVuXowTFngoFW5ejBMWbk9z4iW3ZcjzXQNaMdQHr4&_nc_ohc=vZLOAzKmFu8AX-UYq_M&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCd8eOi5eukT_FKs4Fm1Bsh799TO0Qwqmtzb9Wu03FxgQ&oe=64E5E549",
        IdPublicacion: 456,
        IdTipo: 1,
        Megustas: 200,
        CantidadComentarios: 50,
        FechaPublicacion: "2023-08-01 13:28:00",
        Titulo: "Reina Acromyrmex",
        Contenido: "Las especies de Acromyrmex poseen una cubierta externa dura, el exoesqueleto o cutícula que posee diversas funciones, entre ellas, de armadura, protección ante la radiación solar, como punto de inserción para músculos internos, prevenir la pérdida de agua, etc. Se divide en tres partes principales: cabeza, abdomen y tórax. Un pequeño segmento entre el tórax y el abdomen, el peciolo se encuentra dividido en dos nodos en las especies de Acromyrmex.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "https://inaturalist-open-data.s3.amazonaws.com/photos/145954208/original.jpg",
            imagen2: "https://static.inaturalist.org/photos/97908287/large.jpg",
        },
        Comentarios: [
            {
                IdPerfilComentarios: 789,
                FechaComentario: "2023-11-21 08:28:00",
                NombrePerfilComentarios: "Ana Sanchez",
                urlPerfil: "AnaSanchez",
                ImagenPerfilComentarios: "https://i.pinimg.com/236x/25/41/66/2541663da339e527013e60715d2fced2.jpg",
                Comentario: "¡Interesante información sobre las especies de Acromyrmex y su exoesqueleto. Es fascinante cómo la cutícula no solo proporciona soporte estructural, sino que también desempeña múltiples funciones esenciales, desde la protección solar hasta la regulación hídrica. La segmentación en cabeza, abdomen y tórax, junto con el peciolo de dos nodos, demuestra una complejidad asombrosa en su anatomía. ¡Aprendí algo nuevo hoy!!",
                imagenComentario: "",
                megustaComentarios: 2,
            },
            {
                IdPerfilComentarios: 890,
                FechaComentario: "2023-10-21 15:28:00",
                NombrePerfilComentarios: "Carlos Gomez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://e0.pxfuel.com/wallpapers/442/989/desktop-wallpaper-perfil-boy-face-thumbnail.jpg",
                Comentario: "Interesante información.",
                imagenComentario: "",
                megustaComentarios: 20,
            },
        ],
    },
    {
        IdPerfil: 5,
        NombrePerfil: "Ana Lopez",
        urlPerfil: "AnaLopez",
        ImagenPerfil: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        IdPublicacion: 123,
        IdTipo: 2,
        Megustas: 120,
        CantidadComentarios: 25,
        FechaPublicacion: "2023-08-10 16:20:00",
        Titulo: "Creación de Hormigueros",
        Contenido: "La construcción de hormigueros es una habilidad impresionante que demuestra la adaptación y la inteligencia de las hormigas. Estos nidos subterráneos son verdaderas obras maestras de ingeniería natural. Las hormigas excavan túneles interconectados, cámaras de cría y almacén de alimentos. Además, la ventilación y el control de humedad son cuidadosamente regulados. Algunas especies incluso utilizan diferentes tipos de suelo para fortalecer las estructuras. La construcción de hormigueros es fundamental para la supervivencia y el éxito de la colonia.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "https://lamarabunta.org/4images/data/media/5/1_5.JPG",
            imagen2: "https://lamarabunta.org/4images/data/media/5/3_3.JPG",
        },
        Comentarios: [
            {
                IdPerfilComentarios: 789,
                FechaComentario: "2023-08-11 09:15:00",
                NombrePerfilComentarios: "Mario Gutierrez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_960_720.png",
                Comentario: "¡Es fascinante cómo las hormigas pueden construir hormigueros tan intrincados y funcionales! Su capacidad para regular la humedad, la ventilación y el acceso a diferentes áreas dentro del hormiguero es asombrosa. Realmente son arquitectos naturales. ¡Gran artículo!",
                imagenComentario: "",
                megustaComentarios: 15,
            },
            {
                IdPerfilComentarios: 890,
                FechaComentario: "2023-08-10 17:30:00",
                NombrePerfilComentarios: "Carolina Ramirez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1299610_960_720.png",
                Comentario: "No tenía idea de la complejidad de los hormigueros. Es increíble cómo las hormigas pueden adaptarse al entorno y crear estructuras subterráneas tan impresionantes. Me sorprende su capacidad de ingeniería natural. ¡Gracias por compartir!",
                imagenComentario: "",
                megustaComentarios: 8,
            },
        ],
    },
    {
        IdPerfil: 2,
        NombrePerfil: "Carlos Rodriguez",
        urlPerfil: "JuanPerez",
        ImagenPerfil: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
        IdPublicacion: 789,
        IdTipo: 3,
        Megustas: 80,
        CantidadComentarios: 15,
        FechaPublicacion: "2023-08-11 14:10:00",
        Titulo: "Técnicas y Experimentos con Hormigas",
        Contenido: "¿Alguna vez te has detenido a contemplar la asombrosa vida que ocurre bajo nuestros pies? Las hormigas, diminutas pero increíblemente organizadas, nos ofrecen una ventana a un universo microscópico lleno de maravillas y complejidad. ¡Acompáñanos en un viaje hacia el mundo de las hormigas! 🌍🔍Las hormigas son insectos sociales que han conquistado una variedad de hábitats en todo el planeta. A pesar de su tamaño diminuto, su sociedad altamente estructurada y su capacidad para trabajar en equipo son dignas de admiración. Cada colonia de hormigas se organiza en castas, con trabajadoras, soldados y una reina, cada una con roles específicos en la comunidad.\n\nLas hormigas son maestras de la cooperación y el trabajo en equipo. Observa cómo trabajadoras incansables se comunican entre sí a través de feromonas, marcando caminos, transmitiendo información sobre fuentes de alimento y peligros potenciales. Su dedicación a la colonia es un ejemplo inspirador de sacrificio personal en beneficio del grupo.\n\nPero las hormigas también son arquitectas y agricultoras expertas. Algunas especies construyen intrincados nidos subterráneos, mientras que otras cultivan hongos como fuente de alimento. Su capacidad para adaptarse y prosperar en una variedad de entornos es una lección de resiliencia para todos nosotros.\n\nAdemás de su importancia ecológica, las hormigas también juegan un papel crucial en los ecosistemas al ayudar en la dispersión de semillas y en la descomposición de materia orgánica. Su interacción con otras especies y su influencia en la cadena alimentaria son testimonio de la intrincada red de la vida en la Tierra.La próxima vez que te encuentres en un jardín o caminando por un sendero, detente un momento y observa a las hormigas en acción. Detrás de su pequeño tamaño y su comportamiento aparentemente simple, se esconde un mundo de complejidad, cooperación y maravilla. Las hormigas nos recuerdan que, incluso en las cosas más pequeñas, hay lecciones valiosas que aprender y apreciar.\n\n🔬🐜 #MundoMicroscópico #HormigasIncreíbles #VidaBajoTusPies",
        UrlYoutube: "https://www.youtube.com/watch?v=HRfYuNnm_ZE",
        ImagenesPublicacion: {
            imagen1: "",
            imagen2: ""
        },
        Comentarios: [
            {
                IdPerfilComentarios: 567,
                FechaComentario: "2023-07-06 09:45:00",
                NombrePerfilComentarios: "Laura Fernandez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/08/20/05/40/avatar-1606918_960_720.png",
                Comentario: "¡Me encanta la manera en que las hormigas pueden ser utilizadas como modelos para resolver problemas complejos! Sus estrategias para la búsqueda de alimentos y la toma de decisiones en grupo son fascinantes. ¿Alguna vez has escuchado sobre el 'Problema del viajante'? Las hormigas han inspirado algoritmos para resolver este tipo de desafíos. ¡Gran artículo!",
                imagenComentario: "",
                megustaComentarios: 10
            },
            {
                IdPerfilComentarios: 678,
                FechaComentario: "2023-07-05 16:30:00",
                NombrePerfilComentarios: "Daniel Martinez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/08/20/05/42/avatar-1606920_960_720.png",
                Comentario: "Es sorprendente cómo las hormigas pueden enseñarnos tanto sobre la eficiencia y la colaboración en sistemas complejos. Los experimentos con hormigas han abierto puertas para entender mejor la inteligencia colectiva y aplicar esos principios en tecnología. ¡Muy interesante!",
                imagenComentario: "",
                megustaComentarios: 5
            }
        ]
    }
    ,
    {
        IdPerfil: 1,
        NombrePerfil: "Steven Jocz",
        urlPerfil: "StevenJocz",
        ImagenPerfil: "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/314705105_10228152313408874_7614173374178368106_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHrFUe5yEcf076YPlW78sHT4KBVuXowTFngoFW5ejBMWbk9z4iW3ZcjzXQNaMdQHr4&_nc_ohc=vZLOAzKmFu8AX-UYq_M&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCd8eOi5eukT_FKs4Fm1Bsh799TO0Qwqmtzb9Wu03FxgQ&oe=64E5E549",
        IdPublicacion: 987,
        IdTipo: 0,
        Megustas: 150,
        CantidadComentarios: 30,
        FechaPublicacion: "2023-08-03 12:45:00",
        Titulo: "Descubriendo Especies de Hormigas",
        Contenido: "Explorar y descubrir nuevas especies de hormigas es una tarea emocionante para los entomólogos. Cada especie puede tener características únicas en su comportamiento, morfología y hábitat. Algunas especies se destacan por sus patrones de color llamativos, mientras que otras pueden tener comportamientos de caza fascinantes. Descubrir nuevas especies contribuye a nuestra comprensión de la biodiversidad y la ecología de estos insectos sociales.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "",
            imagen2: "",
        },
        Comentarios: [
            {
                IdPerfilComentarios: 789,
                FechaComentario: "2023-09-15 15:30:00",
                NombrePerfilComentarios: "Juan Rodriguez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/03/31/19/59/avatar-1295430_960_720.png",
                Comentario: "¡Increíble! Descubrir nuevas especies de hormigas es como abrir una puerta a un mundo completamente nuevo y desconocido. Cada especie tiene su propio papel en el ecosistema, y su estudio es esencial para la conservación. ¡Gracias por compartir esta emocionante publicación!",
                imagenComentario: "",
                megustaComentarios: 12,
            },
            {
                IdPerfilComentarios: 890,
                FechaComentario: "2023-09-15 18:20:00",
                NombrePerfilComentarios: "Carolina Ramirez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/03/31/19/59/avatar-1295431_960_720.png",
                Comentario: "Siempre me ha fascinado la diversidad de especies que existen en nuestro planeta. Cada una de ellas tiene su propio papel en el ecosistema y su estudio es esencial para comprender mejor la naturaleza. ¡Excelente artículo!",
                imagenComentario: "",
                megustaComentarios: 8,
            },
        ],
    },
    {
        IdPerfil: 5,
        NombrePerfil: "Ana Lopez",
        urlPerfil: "AnaLopez",
        ImagenPerfil: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        IdPublicacion: 654,
        IdTipo: 0,
        Megustas: 90,
        CantidadComentarios: 12,
        FechaPublicacion: "2023-08-05 09:30:00",
        Titulo: "El Rol de las Hormigas Soldado",
        Contenido: "Dentro de una colonia de hormigas, hay miembros especializados conocidos como hormigas soldado. Estas hormigas tienen características físicas y comportamentales que las distinguen de las obreras. Su principal función es proteger la colonia de amenazas externas, como depredadores y competidores. Las hormigas soldado a menudo tienen mandíbulas fuertes y pueden defender el hormiguero con ferocidad. Su papel es vital para el éxito y la supervivencia de la colonia.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "",
            imagen2: "",
        },
        Comentarios: [
            {
                IdPerfilComentarios: 789,
                FechaComentario: "2023-07-25 11:15:00",
                NombrePerfilComentarios: "Daniel Martínez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/03/31/19/59/avatar-1295430_960_720.png",
                Comentario: "Las hormigas soldado son un ejemplo fascinante de cómo la división del trabajo es crucial en las sociedades de insectos. Estas hormigas especializadas desempeñan un papel clave en la defensa de la colonia, permitiendo que las obreras se centren en otras tareas. ¡Gran artículo!",
                imagenComentario: "",
                megustaComentarios: 6,
            },
        ],
    }, {
        IdPerfil: 6,
        NombrePerfil: "Andrés López",
        urlPerfil: "JuanPerez",
        ImagenPerfil: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        IdPublicacion: 321,
        IdTipo: 3,
        Megustas: 45,
        CantidadComentarios: 8,
        FechaPublicacion: "2023-06-12 17:50:00",
        Titulo: "La Comunicación Química de las Hormigas",
        Contenido: "Las hormigas utilizan señales químicas, conocidas como feromonas, para comunicarse entre sí. Estas sustancias químicas transmiten información sobre la ubicación de alimentos, el rastro hacia el hormiguero y el estado de ánimo de la colonia. Las feromonas también juegan un papel crucial en la organización social y en la coordinación de actividades. La comunicación química es una característica fundamental en la vida de las hormigas.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "https://cdn.pixabay.com/photo/2017/08/23/08/33/ant-2671763_960_720.jpg",
            imagen2: "https://cdn.pixabay.com/photo/2017/08/23/08/33/ant-2671763_960_720.jpg",
        },
        Comentarios: [
            {
                IdPerfilComentarios: 890,
                FechaComentario: "2023-06-12 19:30:00",
                NombrePerfilComentarios: "Carolina Ramírez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/03/31/19/59/avatar-1295431_960_720.png",
                Comentario: "La comunicación química es un ejemplo increíble de cómo las hormigas han desarrollado formas avanzadas de interacción en su sociedad. Estas señales químicas son esenciales para coordinar actividades y mantener la cohesión en la colonia. ¡Muy interesante!",
                imagenComentario: "",
                megustaComentarios: 4,
            },
        ],
    },
    {
        IdPerfil: 1,
        NombrePerfil: "Steven Jocz",
        urlPerfil: "StevenJocz",
        ImagenPerfil: "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/314705105_10228152313408874_7614173374178368106_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHrFUe5yEcf076YPlW78sHT4KBVuXowTFngoFW5ejBMWbk9z4iW3ZcjzXQNaMdQHr4&_nc_ohc=vZLOAzKmFu8AX-UYq_M&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCd8eOi5eukT_FKs4Fm1Bsh799TO0Qwqmtzb9Wu03FxgQ&oe=64E5E549",
        IdPublicacion: 222,
        IdTipo: 1,
        Megustas: 60,
        CantidadComentarios: 10,
        FechaPublicacion: "2023-05-05 14:20:00",
        Titulo: "La Sociedad de las Hormigas Cortadoras de Hojas",
        Contenido: "Las hormigas cortadoras de hojas forman sociedades altamente organizadas en las que cada miembro tiene un papel específico. Estas hormigas recolectan fragmentos de hojas y los utilizan para cultivar hongos, que luego consumen. La división del trabajo es clave en estas colonias, con hormigas recolectoras, soldados y jardineras. La interacción entre las hormigas y los hongos es un ejemplo fascinante de coevolución.",
        UrlYoutube: "",
        ImagenesPublicacion: {
            imagen1: "https://j.gifs.com/P1JYGn.gif"
        },
        Comentarios: [
            {
                IdPerfilComentarios: 789,
                FechaComentario: "2023-05-05 16:00:00",
                NombrePerfilComentarios: "Juan Rodríguez",
                urlPerfil: "CarlosGomez",
                ImagenPerfilComentarios: "https://cdn.pixabay.com/photo/2016/03/31/19/59/avatar-1295430_960_720.png",
                Comentario: "Las hormigas cortadoras de hojas son un ejemplo impresionante de simbiosis y división del trabajo en la naturaleza. La relación entre las hormigas y los hongos cultivados es asombrosa y demuestra cómo la naturaleza puede crear asociaciones complejas. ¡Excelente artículo!",
                imagenComentario: "",
                megustaComentarios: 7,
            },
        ],
    },
    {
        "IdPerfil": 3,
        "NombrePerfil": "María González",
        "urlPerfil": "MariaGonzalez",
        "ImagenPerfil": "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        "IdPublicacion": 555,
        "IdTipo": 2,
        "Megustas": 70,
        "CantidadComentarios": 0,
        "FechaPublicacion": "2023-08-20 10:15:00",
        "Titulo": "Evolución de las Estrategias de Caza en Hormigas",
        "Contenido": "Las hormigas han desarrollado una amplia variedad de estrategias de caza para obtener alimento. Algunas especies son cazadoras solitarias, mientras que otras forman grupos cooperativos para capturar presas más grandes. Estas estrategias de caza son el resultado de millones de años de evolución y adaptación al entorno. Exploraremos cómo las hormigas han refinado sus técnicas para garantizar el éxito en la obtención de alimento.",
        "UrlYoutube": "",
        "ImagenesPublicacion": {
            "imagen1": "https://mf.b37mrtl.ru/actualidad/public_images/2022.03/article/6242ecc1e9ff7142bd1421af.jpeg",
            "imagen2": "https://img.freepik.com/fotos-premium/hormigas-rojas-atacan-su-presa_665346-2336.jpg",
            "imagen3": "https://cumbrepuebloscop20.org/wp-content/uploads/2023/06/ant.jpg"
        },
        "Comentarios": [
            
        ]
    },
    {
        "IdPerfil": 4,
        "NombrePerfil": "Luisa Martínez",
        "urlPerfil": "LuisaMartinez",
        "ImagenPerfil": "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
        "IdPublicacion": 777,
        "IdTipo": 1,
        "Megustas": 40,
        "CantidadComentarios": 0,
        "FechaPublicacion": "2023-08-21 09:30:00",
        "Titulo": "🐜🎉 Explorando el Mundo de las Hormigas Gigantes 🎉🐜",
        "Contenido": "Las hormigas gigantes son un ejemplo sorprendente de la biodiversidad en el reino de los insectos. 🌎🔍 Aunque su tamaño puede ser intimidante, estas hormigas a menudo tienen comportamientos únicos y fascinantes. Algunas especies construyen nidos intrincados bajo tierra, mientras que otras son excelentes cazadoras solitarias. ¡Acompáñanos en un viaje para conocer las maravillas de las hormigas gigantes y su papel en los ecosistemas! 🐜🌿",
        "UrlYoutube": "https://www.youtube.com/watch?v=giHl82SIbXU&t=74s",
        "ImagenesPublicacion": {
            
       
        },"Comentarios": [{
            "IdPerfilComentarios": 678,
            "FechaComentario": "2023-08-21 14:45:00",
            "NombrePerfilComentarios": "Daniel Martinez",
            "urlPerfil": "CarlosGomez",
            "ImagenPerfilComentarios": "https://cdn.pixabay.com/photo/2016/08/20/05/42/avatar-1606920_960_720.png",
            "Comentario": "¡Increíble artículo! Las diferentes estrategias de caza en hormigas muestran la diversidad de enfoques que pueden surgir en la naturaleza para resolver un problema común: conseguir alimento. Desde emboscadas hasta caza en equipo, estas estrategias son un testimonio de la creatividad de la evolución.",
            "imagenComentario": "",
            "megustaComentarios": 6
        } ]
    }
    
    
];



