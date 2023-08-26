import { Formik, Form, Field, ErrorMessage } from 'formik';
import img from '../../assets/imagenes/Logoants.png'
import './Login.css'
import { BotonSubmit } from '../../components/Boton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormValues {
    nombre: string;
    correoElectronico: string;
    password: string;
}
const Registro = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');



    const login = async (values: LoginFormValues) => {
        try {
            setIsLoading(true);
            const { correoElectronico, password } = values;
            console.log(correoElectronico, password)
            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };
    return (
        <div className='login Registro'>
            <div className='login__bg--Uno'></div>
            <div className='login__bg--Tres'></div>
            <div className='Registro__logo'>
                <img src={img} alt="" />
            </div>
            <div className='Registro__Content'>
                <div className='login__container__title'>
                    <h1>Registrarte</h1>
                    <p>Es rápido y fácil.</p>
                </div>
                <div className='Registro__Formulario'>
                    <Formik
                        initialValues={{
                            nombre: '',
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

                            if (!valor.nombre) {
                                errors.nombre = '* Introduce tu nombre.';
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
                                        type='text'
                                        name='Nombre'
                                        placeholder='Nombre'
                                    />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Nombre</label>
                                </div>
                                <div className="login__container__group">
                                    <Field
                                        type='email'
                                        name='correoElectronico'
                                        placeholder='email@ejemplo.com'

                                    />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Email</label>
                                </div>
                                <div className="login__container__group">
                                    <Field
                                        type='password'
                                        name='password'
                                        placeholder='Contraseña nueva'

                                    />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Contraseña</label>
                                </div>

                                <i className='mensaje'>{msg}</i>
                                <ErrorMessage name='nombre' component={() => <div className='error'>{errors.nombre}</div>} />
                                <ErrorMessage name='correoElectronico' component={() => <div className='error'>{errors.correoElectronico}</div>} />
                                <ErrorMessage name='password' component={() => <div className='error'>{errors.password}</div>} />
                                <p className='Aceptar'>Al hacer clic en "Registrarte", aceptas nuestras Condiciones, la Política de privacidad y la Política de cookies.</p>
                                <BotonSubmit texto={'Resgistrarte'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => login} color="guardar" />
                            </Form>
                        )}
                    </Formik>
                </div>
                <Link to="/">Volver al iniciar sesión</Link>
            </div>


        </div>
    )
}

export default Registro