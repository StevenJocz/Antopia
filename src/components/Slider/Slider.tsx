
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
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280632383_1128212597750474_8628435243762885057_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a26aad&_nc_eui2=AeGFNCvcnjZWxBdQ0uG8gh-0iaWJEfXIItOJpYkR9cgi09I3nGWc9V0g8KOSOkxrcdA&_nc_ohc=2OhT03f3vZUAX-r6he6&_nc_ht=scontent.feoh1-1.fna&oh=00_AfBKgRAK1_qwv8U_A1Ds18HvJ0aoBImuJyh85sp22qtYTQ&oe=64EC7F18",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280527858_1128212614417139_1786168534658047508_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a26aad&_nc_eui2=AeEIgQEBf1CY24K1qMbfydoez8WXsRo_9y7PxZexGj_3LtnnP8PpHszFwHrpOW0PMXg&_nc_ohc=sTvFOtpVOo8AX-KTUW_&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCzQH98xOYoA5n6Re-Sl2Q2O7qXzXphImj8lbmg4CV8zA&oe=64EBD864",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280541618_1128212594417141_7492042231666532033_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeHpukOLNT7amJizO5Giowls0f_McLhHKI3R_8xwuEcojdXqQghyPMzUlNrGZEf0LDI&_nc_ohc=L8-48TI7nMkAX9HaoXE&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCvxTsDdQCb80f5_26GL_Xm4Al4ZUndFxUXT-b4jJjPFg&oe=64EC2B64",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280576188_1128212611083806_4801275584459372821_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeFCbzpKTKETOdgcmPhr2BNt_85wYFdklEj_znBgV2SUSNz20SdA3qviW1t6BVSn8d8&_nc_ohc=__2X2kxEhHAAX-hEK-E&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCvy0rmsyHsspwuSWCns9DrDs8deL4NHplz9VBQJoRR3w&oe=64ED9639",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280534245_1128212607750473_5535799036621389629_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeEgr8qoPVJq1otp8x9cd1-UAqxuMqxCx6ACrG4yrELHoF-YcjO37nkuOijLdtpIhCA&_nc_ohc=O6KhJNz4hccAX9EHpjT&_nc_ht=scontent.feoh1-1.fna&oh=00_AfC74wt8qO99nUCpocQ4AQ_QPImyepVSMGn2tDuepN52pA&oe=64EC6487",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280037026_1128212604417140_4665256725255434420_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeHYQ5miwPdgvDA854CjYSpat1Bw9RbOAge3UHD1Fs4CB2WY_TdWNezLbmiHaq3_Ui4&_nc_ohc=X25xEULN5JYAX9o5K3I&_nc_oc=AQlAbmMfZTafN8S9oUNDy_izPJuZv9pJ2Br_wKzV9V2MJe0aA9JGjfcJsDHu2BEGe8fNua-K8QTv5cBU36tBzYx7&_nc_ht=scontent.feoh1-1.fna&oh=00_AfAxLHKrHIKealw2cvP_4Zf-1BJJlz1HIXStc6LNjZXYsQ&oe=64ED5BF8",

    ]

    const imagenesDos = [
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280055606_1125059348065799_2013856194589257937_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeFVjTq-FLrDRhgE0Ue2v2rfKL4xnPajSjEovjGc9qNKMbVXkZz5jPUaZUTg0662SRM&_nc_ohc=RF3eVzFgRyoAX-wabfs&_nc_ht=scontent.feoh1-1.fna&oh=00_AfDORpvKggMBSqN1q54PbhrqEnSBStYl-U63aDp_CQL3uw&oe=64ED6994",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279927345_1125059341399133_3220349046321804049_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeHz6arTG4-m-GwOfiToZPtuGSXk38v7-b4ZJeTfy_v5vnRc1poq4niw02tS72mXp48&_nc_ohc=VTiBDiFU_cwAX-mZoYr&_nc_ht=scontent.feoh1-1.fna&oh=00_AfBmzPb9fy_praGdGZ-q6gPHLKWwcHPGXzkC5ZWTpwIM6w&oe=64ED2212",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280033274_1125059344732466_282601221812189482_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeHDgkFEW83exLWn8TkVi6DjuUCBGevDcDO5QIEZ68NwM6KLqFPyQ4qwNBuTgVPX-nc&_nc_ohc=zyD3yAmmKCYAX-0Rv0P&_nc_ht=scontent.feoh1-1.fna&oh=00_AfD4o_1hS1pv_dGf1mq-3qiokrhUK3V81xhR6SdvqLAo3Q&oe=64EBBB31",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279574329_1125059358065798_5416587234348847579_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeFvVwlfttnM67sRKN5KzsWK6dbdgTcFM-zp1t2BNwUz7H5zBIuT4CJvsW7SlWURRrI&_nc_ohc=Bouiiez4f1UAX9dMM35&_nc_ht=scontent.feoh1-1.fna&oh=00_AfBSs7g6nLF6hoYwLGgx2YN6Zajcl1ZMgP1DoQ2aa-dUxQ&oe=64EC1668",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280091484_1125059351399132_860858473209139250_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeHRjvSK-2Q8Y2H6w_wt-n-aVbymmEIQXnNVvKaYQhBec0nAI96T1xebmJrFujm-W5M&_nc_ohc=Yc9ToThi1PoAX9TJcPV&_nc_ht=scontent.feoh1-1.fna&oh=00_AfBuGTQFEYFvHrvYNLfJVUvEqn7V8hGd5CtmZckDd_vXsQ&oe=64EC7EF9",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/280096606_1125059338065800_2347861406645383478_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeFAqcDQpHAWhoCd0dcdHkBNQ4493UGnHH5Djj3dQaccfosBeIcSLC35BEknzuFsMtQ&_nc_ohc=6dxCCCoDRdoAX-axu_-&_nc_oc=AQn6RRoxufj9P-b2aqCt5UINXVLLWzTrypKIJLf-2j2DMDNdFdsILEsH4AnpE50rScTPd8cgFk-Tarj7o1zzhiIc&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCmdYdOMBBFImAQEYyHcaBFogARRe4FQdfHsb1RlkgZcg&oe=64ECF381",
    ]

    const imagenestres = [
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279578809_1121660335072367_7474420383011565945_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeEPWyszIsesOYGRFWEPihJy1NUnH5jS78XU1ScfmNLvxT6s-CcRAdljSwsEHGeYCxU&_nc_ohc=tAd761PUBMIAX_TTPIM&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCT3i9QW3UQk-jtkD-lhen9qbgK56Y6w8e-ofX9VxML4A&oe=64ED77ED",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279630312_1121660321739035_3001368389299028636_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeFLeBSMF5qmWMCtXZ6Ek4EJHaLywRTq0X0dovLBFOrRfT4Ihy_DfwEWTBjxZWkZz9E&_nc_ohc=ZEaTZBeA_M4AX99SbC2&_nc_ht=scontent.feoh1-1.fna&oh=00_AfDg43lZH7oe_6H7vOleVMGDs2cq5AJlH8_PhvaAUUYwAw&oe=64EC8B7D",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279652228_1121660325072368_1774419403983122031_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeEMjs1u5yX11Aw5QosxdYEpYmywsGd833dibLCwZ3zfd-j1tetfS86AHW1HCJLJkjc&_nc_ohc=UMwe6tbC6FYAX8hd079&_nc_ht=scontent.feoh1-1.fna&oh=00_AfAk4FWBV5Iqr9j-jMsOjCfiGJfg-GVyS7HGQJG4Jw1zoQ&oe=64EDA970",
        "https://scontent.feoh1-1.fna.fbcdn.net/v/t39.30808-6/279413819_1121660338405700_2100495088246377674_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=bcc5cc&_nc_eui2=AeGJrKSFu7VkuSYB50rO7P_V7cOGsr_VZBztw4ayv9VkHLtEpU5AFT_HnZwVB1HOn-s&_nc_ohc=Bnk6PZbHSZAAX9OhlSL&_nc_ht=scontent.feoh1-1.fna&oh=00_AfCrIaEv2ljOYI-HxiHsDeytSaag2M1KiufWcQsXBWh1Tw&oe=64ECE8A6",
    ]


    let objecto: string[] = [];

    if (props.idTipo === 1) {
        objecto = imagenes;
    } else if (props.idTipo === 2) {
        objecto = imagenesDos;
    } else {
        const availableObjectArrays = [imagenes, imagenesDos, imagenestres];
        const usedIndices: number[] = [];

        while (usedIndices.length < availableObjectArrays.length) {
            const randomIndex = Math.floor(Math.random() * availableObjectArrays.length);

            if (!usedIndices.includes(randomIndex)) {
                objecto = availableObjectArrays[randomIndex];
                usedIndices.push(randomIndex);
                break;
            }
        }
    }


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
                {objecto.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt="" />
                    </SwiperSlide>

                ))}
            </Swiper>

        </div>
    )
}

export default Slider