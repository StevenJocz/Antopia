import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Hashtags } from '../../models';
import { useEffect, useState } from 'react';
import { getTohashtag } from '../../services';
import { Link } from 'react-router-dom';
import './Tendencias.css';




const Tendencias = () => {
    const [respuestaHashtag, setRespuestaHashtag] = useState([] as Hashtags[]);
    useEffect(() => {
        consultarHashtag();
        const intervalId = setInterval(consultarHashtag, 180000); // cada 3 minutos
        return () => clearInterval(intervalId);
    }, []);

    const consultarHashtag = async () => {
        try {

            const resultadoHashtag: Hashtags[] = await getTohashtag();
            setRespuestaHashtag(resultadoHashtag);

        } catch (error) {
            // Manejo de errores aquí
            console.error('Error al consultar el servicio:', error);
            // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
        }
    };


    return (
        <div className="Tendencias">
            <h3>Tendencias</h3>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {respuestaHashtag.map((hashtag, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`Hashtag/${hashtag.Hashtag.slice(1)}`} >
                            <div className="tendencia">
                                <h4>{hashtag.Hashtag}</h4>
                                <p>{hashtag.NumeroPublicaciones} publicaciones</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default Tendencias