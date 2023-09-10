import { Link } from 'react-router-dom'
import Error from '../../assets/imagenes/404rafiki.png'
import { PrivateRoutes } from '../../models';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <div className='login__bg--Uno'></div>
            <div className='login__bg--Tres'></div>
            <div className='login__bg--Dos'></div>
            <div className="NotFound__img">
                <img src={Error} alt="" />
                <br />
                <button><Link to={PrivateRoutes.User}>Volver</Link></button>     
            </div>
        </div>
    )
}
export default NotFound