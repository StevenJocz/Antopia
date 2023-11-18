
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Slider.css'
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

interface Props {
    idTipo: number | null;
}

const Slider: React.FC<Props> = () => {

    const imagenes = [
        "https://radio.antopia.org/assets/Imagenesantopia/imagen1.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen2.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen3.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen4.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen5.png",
    ]

    const imagenesdos  = [
        "https://radio.antopia.org/assets/Imagenesantopia/imagen6.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen7.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen8.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen9.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen10.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen11.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen12.png",
    ]

    const imagenestres  = [
        "https://radio.antopia.org/assets/Imagenesantopia/imagen13.png",
        "https://radio.antopia.org/assets/Imagenesantopia/imagen14.png",
        
    ]

    const [imagenActual, setImagenActual] = useState(imagenes);

    useEffect(() => {
        // Número aleatorio entre 0 y 1 para determinar qué lista usar
        const randomValue = Math.random();
        
        // Condiciones para decidir qué lista de imágenes utilizar
        let nuevaLista;
        if (randomValue < 0.33) {
            nuevaLista = imagenes;
        } else if (randomValue < 0.67) {
            nuevaLista = imagenesdos;
        } else {
            nuevaLista = imagenestres;
        }
    
        // Establecer la nueva lista de imágenes
        setImagenActual(nuevaLista);
    }, []);

    return (
        <div className='Swiper swiperdos'>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >
                {imagenActual.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default Slider