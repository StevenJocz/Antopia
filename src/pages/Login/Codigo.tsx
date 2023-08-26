import React, { useState } from 'react'
import logo from '../../assets/imagenes/hormigaLogo.png'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BotonSubmit } from '../../components/Boton';
import CambioPassword from './CambioPassword';



interface CodigoProps {
    correoElectronico: string;
}

interface CodigoFormValues {
    correoElectronico: string;
    codigo: string;
}

const Codigo: React.FC<CodigoProps> = ({ correoElectronico }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [mostrarCambioPassword, setmostrarCambioPassword] = useState(false);

    const handleEnviarCodigo = async (values: CodigoFormValues) => {
        try {
            setIsLoading(true);
            const { correoElectronico, codigo } = values;
            console.log(correoElectronico, codigo);
            setmostrarCambioPassword(true);


            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!mostrarCambioPassword ? (
                <>
                    <div className='login__container__title'>
                        <img src={logo} alt="" />
                        <h1>¡Correo electrónico enviado!</h1>
                        <p>Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas en el correo electrónico para completar el proceso.</p>
                    </div>
                    <div className='login__container__input'>
                        <Formik
                            initialValues={{
                                correoElectronico: correoElectronico,
                                codigo: '',
                            }}
                            validate={(values) => {
                                let errors: any = {};
                                if (!values.codigo) {
                                    errors.codigo = '* Digita el código que se envio al correo electrónico';
                                }
                                return errors;
                            }}
                            onSubmit={handleEnviarCodigo}
                        >
                            {({ errors, isSubmitting, touched }) => (
                                <Form>
                                    <div className="login__container__group">
                                        <Field
                                            type='text'
                                            name='codigo'
                                            placeholder='123456'
                                            className={errors.codigo && touched.codigo ? 'Input_Border_Red' : ''}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Email</label>
                                    </div>
                                    <i className='mensaje'>{msg}</i>
                                    <ErrorMessage name='codigo' component={() => <div className='error'>{errors.codigo}</div>} />
                                    <BotonSubmit texto='Enviar Código' isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleEnviarCodigo} color="guardar" />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </>
            ) : (
                <CambioPassword correoElectronico={correoElectronico} />
            )}

        </div>
    );
}
export default Codigo