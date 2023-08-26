import { ErrorMessage, Field, Form, Formik } from 'formik';
import logo from '../../assets/imagenes/hormigaLogo.png'
import { BotonSubmit } from '../../components/Boton';
import { useState } from 'react';
import Codigo  from './Codigo';

interface RecordarProps {
    mostrarIniciarSesion: () => void;
}

interface LoginFormValues {
    correoElectronico: string;
}

const Recordarme: React.FC<RecordarProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [mostrarCodigo, setMostrarCodigo] = useState(false);
    const [correoElectronico, setCorreoElectronico] = useState('');
    const handleRecordar = async (values: LoginFormValues) => {
        try {
            const { correoElectronico } = values;
            setIsLoading(true);
            console.log(correoElectronico)
            setCorreoElectronico(correoElectronico);
            setMostrarCodigo(true);
            setIsLoading(false);

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };
    return (
        <>
            {!mostrarCodigo ? (
                <>
                    <div className='login__container__title'>
                        <img src={logo} alt="" />
                        <h1>Olvidé mi contraseña</h1>
                        <p>Se enviarán instrucciones al correo electrónico</p>
                    </div>
                    <div className='login__container__input'>

                        <Formik
                            initialValues={{
                                correoElectronico: ''
                            }}
                            validate={(valor_remember) => {
                                let errors: any = {};
                                if (!valor_remember.correoElectronico) {
                                    errors.correoElectronico = 'Introduce una dirección de correo electrónico válida.';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valor_remember.correoElectronico)) {
                                    errors.correoElectronico = 'Introduce una dirección de correo electrónico válida.';
                                }
                                return errors;
                            }}
                            onSubmit={handleRecordar}
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

                                    <i className='mensaje'>{msg}</i>
                                    <ErrorMessage name='correoElectronico' component={() => <div className='error'>{errors.correoElectronico}</div>} />
                                    <BotonSubmit texto={'Recordarme'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleRecordar} color="guardar" />
                                    <p onClick={props.mostrarIniciarSesion} className='Crear-cuenta'><span> Volver a Iniciar sesión</span> </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </>
            ) : (
                <Codigo correoElectronico={correoElectronico} />
            )}
        </>
    )
}

export default Recordarme