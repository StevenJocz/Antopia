// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



export const SliderEcomerce = () => {

    const imagenes = [
        "https://radio.antopia.org/assets/Imagenesantopia/Ecomerce/imagen1.jpg",
        "https://radio.antopia.org/assets/Imagenesantopia/Ecomerce/imagen2.jpg",
        "https://radio.antopia.org/assets/Imagenesantopia/Ecomerce/imagen3.jpg",
        "https://radio.antopia.org/assets/Imagenesantopia/Ecomerce/imagen4.jpg",

    ]

    return (
        <div className='Swiper'>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    reverseDirection:true
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {imagenes.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}
