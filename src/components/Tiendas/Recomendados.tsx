import { SliderEcomerce } from "../Slider"

import './Recomendados.css'

const Recomendados = () => {
    return (
        <div className='Recomendados'>
            <a href="https://www.neuants.com/" target="_blank">
                <div className="Recomendados-encabezado">
                    <div className="Recomendados-encabezado-titulo">
                        <p>Recomendado</p>
                    </div>
                    <div>
                        <img src="https://www.neuants.com/wp-content/uploads/elementor/thumbs/Logo-qbsz5jifpy955oz8j0sbc25ssff6bi50k268qxmmtw.png" alt="" />
                        <h2>NeuAnts</h2>
                    </div>
                    <p>En nuestra tienda, encontrarás una amplia selección de productos  para satisfacer todas tus necesidades hormigueras</p>
                </div>
                <div className="Recomendados-contect">

                    <SliderEcomerce />

                </div>
            </a>
        </div>
    )
}

export default Recomendados