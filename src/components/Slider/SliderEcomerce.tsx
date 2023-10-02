// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



export const SliderEcomerce = () => {

    const imagenes = [
        "https://antopiaapi.azurewebsites.net/ImagenesEcomerce/imagen1.jpg",
        "https://antopiaapi.azurewebsites.net/ImagenesEcomerce/imagen2.jpg",
        "https://antopiaapi.azurewebsites.net/ImagenesEcomerce/imagen3.jpg",
        "https://antopiaapi.azurewebsites.net/ImagenesEcomerce/imagen4.jpg",
        "https://antopiaapi.azurewebsites.net/ImagenesEcomerce/imagen5.jpg",

    ]

    return (
        <div className='Swiper'>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Keyboard, Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {imagenes.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt="" />
                    </SwiperSlide>

                ))}
            </Swiper>

        </div>
    )
}
