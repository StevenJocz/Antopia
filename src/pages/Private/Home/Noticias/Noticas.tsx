
import Reina from '../../../../assets/imagenes/reina.png';
import './Noticias.css';
const Noticas = () => {
    return (
        <div className='Noticas'>
            <h2>🎉 ¡Felicitaciones eres Nivel Reina! 🎉</h2>
            <div>
                <img src={Reina} className='' alt="" />
            </div>
            <p>Como nivel Reina, tu papel es fundamental para construir y mantener este vibrante espacio. Aquí te dejo un vistazo a tus responsabilidades y cómo tu liderazgo transforma nuestra comunidad de Antopia:</p>
            <p>🌐 <span>Funciones exclusivas:</span> Ahora prodrás crear tus propias colonias.</p>
            <p>🛡 <span>Moderación Justa:</span> Tu labor incluye asegurar un entorno seguro y respetuoso, eliminando contenido inapropiado y fomentando la convivencia positiva.</p>
            <p>🔧 <span>Facilitador del Diálogo:</span> Anima a todos a participar y compartir sus pensamientos. Tu tarea es crear un ambiente donde cada voz sea valorada.</p>
            <p> 🌟 <span>Reconocimiento y Agradecimiento:</span> Celebra los logros de los miembros y agradece sus contribuciones. Un pequeño gesto puede tener un gran impacto.</p>
            <h4>Recuerda, tu participación activa y liderazgo inspiran a otros. ¡Sigamos construyendo esta comunidad excepcional!</h4>
        </div>
    )
}

export default Noticas