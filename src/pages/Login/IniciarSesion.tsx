import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { clearLocalStorage } from '../../utilities/localStorage.utility';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import logo from '../../assets/imagenes/hormigaLogo.png';
import { PrivateRoutes, /*PublicRoutes,*/ Roles } from '../../models';
import {/*UserKey,*/ createUser, /*resetUser, TokenKey*/ } from '../../redux/states/user';
import { getIniciar } from '../../services';
import { BotonSubmit } from '../../components/Boton';
import { Base64 } from "js-base64";
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline} from 'ionicons/icons';

interface LoginFormValues {
    correoElectronico: string;
    password: string;
}

interface IniciarProps {
    mostrarRecordar: () => void;
    mostrarRegistro: () => void;
}

const IniciarSesion: React.FC<IniciarProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        // Verificar si el usuario tiene un token en localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            navigate(`/${PrivateRoutes.User}`, { replace: true });
        }
    }, []);

    const login = async (values: LoginFormValues) => {
        try {
            setIsLoading(true);
            const { correoElectronico, password } = values;

            const result = await getIniciar(correoElectronico.toLowerCase(), password);
            if (result.resultado === false) {
                setMsg(result.msg);

            } else {

                localStorage.setItem('token', result.token);
                const token = result.token.split(".")[1];
                const decodedValue = Base64.decode(token);
                const obj = JSON.parse(decodedValue);

                const userRole = Roles.USER;

                dispatch(createUser({ ...obj, rol: userRole }));
                navigate(`/${PrivateRoutes.User}`, { replace: true });

            }
            setIsLoading(false);

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='login__container__title'>
                <img src={logo} alt="" />
                <h1>Inicie sesión para comenzar</h1>
            </div>
            <div className='login__container__input'>
                <Formik
                    initialValues={{
                        correoElectronico: '',
                        password: '',
                    }}
                    validate={(valor) => {
                        let errors: any = {};
                        if (!valor.correoElectronico) {
                            errors.correoElectronico = '* Introduce tu correo electrónico.';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valor.correoElectronico)) {
                            errors.correoElectronico = '* Introduce una dirección de correo electrónico válida.';
                        }

                        if (!valor.password) {
                            errors.password = '* Introduce tu contraseña.';
                        }
                        setMsg('');
                        return errors;
                    }}
                    onSubmit={login}
                >
                    {({ errors, isSubmitting }) => (
                        <Form>
                            <div className="login__container__group">
                                <Field
                                    type='email'
                                    name='correoElectronico'
                                    placeholder='email@ejemplo.com'
                                    className={errors.correoElectronico ? 'Input_Border_Red' : ''}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Email</label>
                            </div>
                            <div className="login__container__group">
                                <Field
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder='*******'
                                    className={errors.password ? 'Input_Border_Red' : ''}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Contraseña</label>
                                <span
                                    className="eye-icon" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                >
                                    {showPassword ?   <IonIcon className='eye-iconS' icon={eyeOffOutline} /> :<IonIcon className='eye-iconS' icon={eyeOutline} />} 
                                </span>

                            </div>
                            <p onClick={props.mostrarRecordar} className='olvido-contrseña'>¿Olvidé mi contraseña?</p>
                            <i className='mensaje'>{msg}</i>
                            <ErrorMessage name='correoElectronico' component={() => <div className='error'>{errors.correoElectronico}</div>} />
                            <ErrorMessage name='password' component={() => <div className='error'>{errors.password}</div>} />
                            <BotonSubmit texto={'Continuar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => login} color="guardar" />
                            <p className='Crear-cuenta'>¿No tienes una cuenta? <span> <Link to="/Registro">Únete</Link> </span> </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default IniciarSesion