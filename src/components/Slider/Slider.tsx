
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Slider.css'
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

interface Props {
    idTipo: number | null;
}

const Slider: React.FC<Props> = () => {

    const imagenes = [
        "http://localhost:5239/ImagesSlider/imagen1.jpg",
        "http://localhost:5239/ImagesSlider/imagen2.jpg",
        "http://localhost:5239/ImagesSlider/imagen3.jpg",
        "http://localhost:5239/ImagesSlider/imagen4.jpg",
        "http://localhost:5239/ImagesSlider/imagen5.jpg",

    ]

    return (
        <div className='Swiper'>
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
                {imagenes.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt="" />
                    </SwiperSlide>

                ))}
            </Swiper>

        </div>
    )
}

export default Slider