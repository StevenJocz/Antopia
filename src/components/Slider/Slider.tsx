
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

const Slider: React.FC<Props> = (props) => {

    const imagenes = [
        "https://antopiaapi.azurewebsites.net/ImagesSlider/imagen1.jpg",
        "https://antopiaapi.azurewebsites.net/ImagesSlider/imagen2.jpg",
        "https://antopiaapi.azurewebsites.net/ImagesSlider/imagen3.jpg",
        "https://antopiaapi.azurewebsites.net/ImagesSlider/imagen4.jpg",
        "https://antopiaapi.azurewebsites.net/ImagesSlider/imagen5.jpg",

    ]
    console.log(props.idTipo)

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