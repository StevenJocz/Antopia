import { Link} from 'react-router-dom';
import './Grupo.css'

const Grupo = () => {

    const back = {
        backgroundImage: `url('https://antopiaapi.azurewebsites.net/ImagesPublication/65a3c98a-28d2-45ef-a6ab-8efadea0e3a0.jpg')`,
        backgroundSize: 'cover',
        backgroundPositionY: '75%',
    };

    return (
        <div className='Grupo'>
            <div className="Grupo-portada" style={back}>
                <div className="Grupo-info">
                    <h2>Solenopsis Colombia</h2>
                    <p>¡Bienvenidos a nuestro rincón de las hormigas Solenopsis! Aquí profundizamos en los temas más apasionantes sobre nuestra especie y nuestro importante papel en la naturaleza.</p>
                    <div className='Grupo-user'>
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/857a9e53-786c-40f1-84a4-4c97c3da6a26.jpg" alt="" />
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/298456283_1022744810180402.jpg" alt="" />
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/eb523fc9-8d71-4ea1-a17a-4cdaf6e6ea08.jpg" alt="" />
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/857a9e53-786c-40f1-84a4-4c97c3da6a26.jpg" alt="" />
                        <img src="https://antopiaapi.azurewebsites.net/ImagesPerfil/298456283_1022744810180402.jpg" alt="" />
                        <p>90 Miembros</p>
                        <button className='Grupo-btn'>Unirme</button>
                    </div>                
                </div>
            </div>
            <div className='Grupo-Menu'>
                <ul>
                    <Link to={`/Home/`}><li>Conversación</li></Link>
                    <Link to={`/Home/`}><li>Imagenes</li></Link>
                    <Link to={`/Home/`}><li>Acerca de</li></Link>
                </ul>
            </div>

        </div>
    )
}

export default Grupo