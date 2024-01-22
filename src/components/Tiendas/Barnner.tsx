import barnnerNeu from "../../assets/imagenes/bannerNeu.jpg"
const Barnner = () => {
    return (
        <div className="Banner">
            <p>Recomendado</p>
            <a href="https://www.neuants.com/" target="_blank">
                <img src={barnnerNeu} alt="" loading="lazy" className="Banner-imagen" />
            </a>
        </div>
    )
}

export default Barnner