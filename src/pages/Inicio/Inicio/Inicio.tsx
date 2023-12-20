import { Link } from "react-router-dom"
import { PublicacionesProvider } from "../../../Context/PublicacionesContext"
import { Slider } from "../../../components/Slider"
import { Card } from "../Card"
import Typewriter from "typewriter-effect";


const InicioAntopia = () => {
    return (
        <div className="Inicio_body-card">
            <div className="Inicio_Layout-sidebar-right-inicio">
                <h1>
                    <Typewriter
                        options={{
                            strings: [' Explora', ' Descubre', ' Aprende', 'Comparte', 'Sumérgete'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h1>
                <h2> En el cautivador mundo de Antopia, la red social para entusiastas de las hormigas.</h2>
                <Link to='/Registro'>Únete</Link>
            </div>
            <PublicacionesProvider idTipo={1} idPerfil={17} idColonia={0} opcion={1} hashtag="">

                <Slider idTipo={1} />
                <h2>Reciente</h2>
                <Card />
            </PublicacionesProvider>
        </div>
    )
}

export default InicioAntopia