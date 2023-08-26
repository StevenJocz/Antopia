import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import logo from '../../assets/imagenes/hormigaLogo.png'
import { BotonSubmit } from "../../components/Boton";

interface CodigoProps {
    correoElectronico: string;
}

interface CodigoFormValues {
    correoElectronico: string;
    password: string;
}

const CambioPassword: React.FC<CodigoProps> = ({ correoElectronico }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleCambiarPassword = async (values: CodigoFormValues) => {
        try {
            setIsLoading(true);
            const { correoElectronico, password } = values;
            console.log(correoElectronico, password);

            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };
    return (
        <div>

            <div className='login__container__title'>
                <img src={logo} alt="" />
                <h1>Cambio de contraseña</h1>
                <p>Por favor, ingresa su nueva contraseña a continuación y confírmala para completar el cambio.</p>
            </div>
            <div className='login__container__input'>
                <Formik
                    initialValues={{
                        correoElectronico: correoElectronico,
                        password: '',
                        passwordCorregido: '',
                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.password) {
                            errors.password = '* Nueva contraseña requerida';
                        } else {
                            if (!/(?=.*[A-Z])/.test(values.password)) {
                                errors.password = '* Debe contener al menos una mayúscula';
                            }
                            if (!/(?=.*\d)/.test(values.password)) {
                                errors.password = '* Debe contener al menos un número';
                            }
                            if (values.password.length < 8) {
                                errors.password = '* Debe tener una longitud mayor a 7 caracteres';
                            }

                            if (
                                !/(?=.*[A-Z])(?=.*\d).{8,}/.test(values.password) &&
                                !errors.password // Verificar si no hay errores individuales ya establecidos
                            ) {
                                errors.password = '* La contraseña debe contener al menos una mayúscula, un número y tener una longitud mayor a 7 caracteres';
                            }
                        }

                        if (values.passwordCorregido !== values.password) {
                            errors.passwordCorregido = '* Las contraseñas no coinciden';
                        } else if (!values.passwordCorregido) {
                            errors.passwordCorregido = '  * Confirme la nueva contraseña';
                        }
                        return errors;
                    }}
                    onSubmit={handleCambiarPassword}
                >
                    {({ errors, isSubmitting, touched }) => (
                        <Form>
                            <div className="login__container__group">
                            <Field
                                    type='password'
                                    name='password'
                                    placeholder='******'
                                    className={errors.password && touched.password ? 'Input_Border_Red' : ''}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Nueva contraseña</label>
                            </div>
                            <div className="login__container__group">
                                <Field
                                    type='password'
                                    name='passwordCorregido'
                                    placeholder='******'
                                    className={errors.passwordCorregido && touched.passwordCorregido ? 'Input_Border_Red' : ''}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Confirmar contraseña</label>
                            </div>
                            <i className='mensaje'>{msg}</i>
                            <ErrorMessage name='password' component={() => <div className='error'>{errors.password}</div>} />
                            <ErrorMessage name='passwordCorregido' component={() => <div className='error'>{errors.passwordCorregido}</div>} />
                            <BotonSubmit texto='Cambiar contraseña' isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleCambiarPassword} color="guardar" />
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default CambioPassword