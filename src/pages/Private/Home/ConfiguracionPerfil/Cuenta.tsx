import { ErrorMessage, Field, Form, Formik } from 'formik';
import './ConfiguracionPerfil.css'
import { useEffect, useState } from 'react';
import { AppStore } from '../../../../redux/store';
import { InfoPerfil } from '../../../../models';
import { useSelector } from 'react-redux';
import { PostActualizarDatos, getPerfil } from '../../../../services';
import { IonIcon } from "@ionic/react";
import { bagOutline, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { PropagateLoader } from 'react-spinners';
import { BotonSubmit } from '../../../../components/Boton';

const Cuenta = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [check, setCheck] = useState(true);
    const userState = useSelector((store: AppStore) => store.user);
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);

    const [frase, setFrase] = useState('');

    const handleCuenta = async () => {
        handleActualizarDatos('1', frase)
    };

    const handleActualizarDatos = async (tipo: string, dato: string) => {
        try {
            setIsLoading(true);
            const idPerfil = userState.IdPerfil

            const result = await PostActualizarDatos(idPerfil.toString(), tipo, dato);
            if (result.resultado === false) {
                setMsg(result.message);
                setCheck(false);
            } else {
                setMsg('¡Frase actualizada correctamente!');
                setCheck(true);
            }
            setIsLoading(false);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');

            setIsLoading(false);
        }
    };

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(userState.IdPerfil), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    const fetchedPerfil = fetchedPerfiles[0];
                    setPerfil(fetchedPerfil);
                    if (fetchedPerfil != null) {
                        setFrase(fetchedPerfil.Frase);
                    }
                } else {
                    setPerfil(null);
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        fetchPerfil();
    }, [userState.IdPerfil]);
    
    if (perfil === null) {
        return (
            <div className='PropagateLoader'>
                <PropagateLoader color="#fff" speedMultiplier={1} size={30} />
            </div>
        )
    }


    return (
        <div className="Configuracion-Cuenta">
            <h2>Cuenta</h2>
            <div className='Configuracion-Formulario'>

                <Formik
                    initialValues={{
                        correoElectronico: perfil.Correo,
                        usuario: '@' + perfil.urlPerfil,
                    }}

                    validate={(valor_remember) => {
                        let errors: any = {};
                        if (!valor_remember.correoElectronico) {
                            errors.correoElectronico = 'Introduce una dirección de correo electrónico válida.';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valor_remember.correoElectronico)) {
                            errors.correoElectronico = 'Introduce una dirección de correo electrónico válida.';
                        }

                        if (!valor_remember.usuario) {
                            errors.usuario = 'Introduce un usuario válido.';
                        }
                        return errors;
                    }}
                    onSubmit={handleCuenta}
                >
                    {({ errors, isSubmitting }) => (
                        <Form>
                            <div className="Content-input disabled">
                                <label>Usuario</label>
                                <Field
                                    type='text'
                                    name='usuario'
                                    placeholder='@Usuario'
                                    className={errors.usuario ? 'Input_Border_Red' : ''}
                                    disabled
                                />
                                <IonIcon className='Icono-Configuracion' icon={bagOutline} />
                                <ErrorMessage name='usuario' component={() => <div className='error'>{errors.usuario}</div>} />
                            </div>
                            <div className="Content-input disabled">
                                <label>Email</label>
                                <Field
                                    type='email'
                                    name='correoElectronico'
                                    placeholder='email@ejemplo.com'
                                    className={errors.correoElectronico ? 'Input_Border_Red' : ''}
                                    disabled
                                />
                                <IonIcon className='Icono-Configuracion' icon={bagOutline} />
                                <ErrorMessage name='correoElectronico' component={() => <div className='error'>{errors.correoElectronico}</div>} />
                            </div>

                            <div className="Content-input">
                                <label>Demostraste tu profundo cariño y fascinación por las hormigas en una maravillosa frase.</label>
                                <textarea
                                    name='frase'
                                    placeholder='Expresa tu pasión por las hormigas'
                                    onChange={(e) => setFrase(e.target.value)}
                                    value={frase || ''}
                                />
                            </div>
                            {msg != '' && (
                                check ? (
                                    <IonIcon className='IconocheckTrue' icon={checkmarkCircleOutline} />
                                ) : (
                                    <IonIcon className='IconocheckFalse' icon={closeCircleOutline} />
                                )
                            )}
                            <i className={`${check == true ? "MsnCorrecto" : "MsnInCorrecto"}`}>{msg}</i>
                            <BotonSubmit texto={'Guardar cambios'} isLoading={isLoading} isSubmitting={isSubmitting} color="enviar" />
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default Cuenta