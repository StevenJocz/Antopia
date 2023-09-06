import { Link } from 'react-router-dom'
import Error from '../../assets/svg/404rafiki.svg'
import { PublicRoutes } from '../../models';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <div className='login__bg--Uno'></div>
            <div className='login__bg--Tres'></div>
            <div className='login__bg--Dos'></div>
            <div className="NotFound__img">
                <img src={Error} alt="" />
                <button><Link to={PublicRoutes.Home}>Únete</Link></button>     
            </div>
        </div>
    )
}
export default NotFound