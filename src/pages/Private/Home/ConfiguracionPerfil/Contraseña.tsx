import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from 'ionicons/icons';
import { BotonSubmit } from "../../../../components/Boton";
import { useState } from "react";
import { PostActualizarPassword } from "../../../../services";


interface CodigoFormValues {
    password: string;
}

function Contraseña() {
    const userState = useSelector((store: AppStore) => store.user);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [cambioCorrecto, setcambioCorrecto] = useState(false);

    const handleCambiarPassword = async (values: CodigoFormValues) => {
        try {
            setIsLoading(true);
            const { password } = values;

            const result = await PostActualizarPassword(userState.email, password);
            if (result.resultado === false) {
                setMsg(result.message);
            } else {
                setMsg(result.message);
                setcambioCorrecto(true);
            }
            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };

    return (
        <>
            {cambioCorrecto ? (
                <div className="Content-exitoso">
                    <div className='color_IconoLogin'>
                        <IonIcon icon={checkmarkCircleOutline} />
                    </div>
                    <p className='Configuracion-mensajeCambio'>¡Cambio de contraseña exitoso!</p>
                </div>
            ) : (
                <div className="Configuracion-Cuenta">
                    <h2>Contraseña</h2>
                    <p>Por favor, ingresa su nueva contraseña a continuación y confírmala para completar el cambio.</p>
                    <div className='Configuracion-Formulario'>
                        <Formik
                            initialValues={{
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
                                    <div className="Content-input">
                                        <label>Nueva contraseña</label>
                                        <Field
                                            type='password'
                                            name='password'
                                            placeholder='******'
                                            className={errors.password && touched.password ? 'Input_Border_Red' : ''}
                                        />
                                    </div>
                                    <div className="Content-input">
                                        <label>Confirmar contraseña</label>
                                        <Field
                                            type='password'
                                            name='passwordCorregido'
                                            placeholder='******'
                                            className={errors.passwordCorregido && touched.passwordCorregido ? 'Input_Border_Red' : ''}
                                        />

                                    </div>
                                    <i className='mensaje'>{msg}</i>
                                    <ErrorMessage name='password' component={() => <div className='error'>{errors.password}</div>} />
                                    <ErrorMessage name='passwordCorregido' component={() => <div className='error'>{errors.passwordCorregido}</div>} />
                                    <BotonSubmit texto='Cambiar contraseña' isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleCambiarPassword} color="enviar" />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contraseña