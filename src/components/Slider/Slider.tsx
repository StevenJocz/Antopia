
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Slider.css'
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ModalImagenComplet from '../ModalImagenes/ModalImagenComplet';

interface Props {
    idTipo: number | null;
}

const Slider: React.FC<Props> = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const openModal = (index: number, imagen: string[]) => {
        setSelectedImageIndex(index);
        setSelectedImage(imagen);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

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

    const imagenesCautro  = [
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-1.png",
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-2.png",
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-3.png",
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-4.png",
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-5.png",
        "https://radio.antopia.org/assets/Imagenesantopia/consejo-6.png",
        
    ]

    const imagenesCinco  = [
        "https://radio.antopia.org/assets/Imagenesantopia/1.png",
        "https://radio.antopia.org/assets/Imagenesantopia/2.png",
        "https://radio.antopia.org/assets/Imagenesantopia/3.png",
        "https://radio.antopia.org/assets/Imagenesantopia/4.png",
        "https://radio.antopia.org/assets/Imagenesantopia/5.png",
        
    ]

    const [imagenActual, setImagenActual] = useState(imagenes);

    useEffect(() => {
        // Número aleatorio entre 0 y 1 para determinar qué lista usar
        const randomValue = Math.random();
        
        // Condiciones para decidir qué lista de imágenes utilizar
        let nuevaLista;
        if (randomValue < 0.2) {
            nuevaLista = imagenesdos;
        } else if (randomValue < 0.4) {
            nuevaLista = imagenestres;
        } else if (randomValue < 0.6) {
            nuevaLista = imagenesCautro;
        } else if (randomValue < 0.8) {
            nuevaLista = imagenes;
        } else {
            nuevaLista = imagenesCinco;
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
                {imagenActual.map((img, index) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt="antopia.org" onClick={() => openModal(index, imagenActual)}/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {
                selectedImageIndex !== null && (
                    <ModalImagenComplet
                        imageUrls={selectedImage}
                        currentIndex={selectedImageIndex}
                        onClose={closeModal}
                    />
                )
            }

        </div>
    )
}

export default Slider