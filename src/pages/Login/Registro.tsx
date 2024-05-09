import img from '../../assets/imagenes/Logoants.png'
import PerfilBlonco from '../../assets/imagenes/perfil-blanco.png'
import NoImagen from '../../assets/imagenes/NoImagen.png'
import './Login.css'
import { BotonSubmit } from '../../components/Boton';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostRegistrarUser } from '../../services';
import { IonIcon } from '@ionic/react';
import { shieldCheckmarkOutline } from 'ionicons/icons';



const Registro = () => {
    const [numeroPaso, setnumeroPaso] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputRefFondo = useRef<HTMLInputElement | null>(null);
    const [textBoton, setTextBoton] = useState('Continuar y registrarse');

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');

    const [fondo, setfondo] = useState('');
    const [fotoPerfilPreview, setFotoPerfilPreview] = useState('');

    const [fotoPerfilBase64, setFotoPerfilBase64] = useState('');
    const [fondoBase64, setFondoBase64] = useState('');

    const [contraseña, setContraseña] = useState('');
    const [contraseñaDos, setContraseñaDos] = useState('');

    const [frase, setFrase] = useState('');

    const handlenumeroPaso = () => {
        setIsLoading(true);
        if (numeroPaso === 1) {
            setMsg('');
            setTextBoton('Siguiente');
            setnumeroPaso(numeroPaso + 1);
            setIsLoading(false);

        }
        else if (numeroPaso === 2) {
            if (nombre === '') {
                setMsg('* El nombre es requerido');
                setIsLoading(false);
                return;
            }
            if (correo === '') {
                setMsg('* El correo electrónico es requerido');
                setIsLoading(false);
                return;
            }
            if (correo.indexOf('@') === -1) {
                setMsg('* El correo electrónico no es válido');
                setIsLoading(false);
                return;
            }
            if (correo.indexOf('.') === -1) {
                setMsg('* El correo electrócnio no es válido');
                setIsLoading(false);
                return;
            }
            setMsg('');
            setTextBoton('Siguiente');
            setnumeroPaso(numeroPaso + 1);
            setIsLoading(false);

        }
        else if (numeroPaso === 3) {
            if (fotoPerfilPreview === '') {
                setMsg('* La foto de perfil es requerida');
                setIsLoading(false);
                return;
            }
            if (fondo === '') {
                setMsg('*La portada es requerida');
                setIsLoading(false);
                return;
            }
            setMsg('');
            setTextBoton('Siguiente');
            setnumeroPaso(numeroPaso + 1);
            setIsLoading(false);

        } else if (numeroPaso === 4) {

            if (frase === '') {
                setMsg('* La frase es un campo requerido, ya que nos permite capturar tu pasión en palabras y expresarla al mundo.');
                setIsLoading(false);
                return;
            }

            if (frase.length < 10) {
                setMsg('* ¡Tu pasión por las hormigas merece palabras más extensas! Deja que tu inspiración fluya.');
                setIsLoading(false);
                return;
            }

            if (frase.length >= 150) {
                setMsg('* Tu pasión por las hormigas es evidente, A veces, menos es más');
                setIsLoading(false);
                return;
            }


            setMsg('');
            setTextBoton('Registrarse');
            setnumeroPaso(numeroPaso + 1);
            setIsLoading(false);
        }
        else if (numeroPaso === 5) {
            if (contraseña === '') {
                setMsg('* La contraseña es requerida');
                setIsLoading(false);
                return;
            }
            if (contraseña.length < 8) {
                setMsg('* La contraseña no es válida');
                setIsLoading(false);
                return;
            }
            if (!/(?=.*[A-Z])/.test(contraseña)) {
                setMsg('* La contraseña debe contener al menos una mayúscula');
                setIsLoading(false);
                return;
            }
            if (!/(?=.*\d)/.test(contraseña)) {
                setMsg('* La contraseña debe contener al menos un número');
                setIsLoading(false);
                return;
            }
            if (contraseña !== contraseñaDos) {
                setMsg('* Las contraseñas no coinciden ');
                setIsLoading(false);
                return;
            }
            setMsg('');

            CreateUser()


        }
    };

    const CreateUser = async () => {
        try {

            const userData = {
                id: 0,
                s_user_name: nombre,
                fk_user_address_city: 1,
                s_user_email: correo.toLowerCase(),
                Password: contraseña,
                s_userProfile: nombre.replace(/\s+/g, ''),
                s_userPhoto: fotoPerfilBase64,
                s_userFrontpage: fondoBase64,
                s_frase: frase,
                fk_tblRol: 2,
                fk_tbl_level: 1
            };

            const result = await PostRegistrarUser(userData);
            if (result.resultado === false) {

                console.log(result.msg)
                setMsg(result.msg);

            } else {
                setnumeroPaso(numeroPaso + 1);
                setIsLoading(false);

            }

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };



    const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setFotoPerfilPreview(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string;
                    setFotoPerfilBase64(base64Image);
                }
            };

            reader.readAsDataURL(files[0]);
        }
    };

    const handleFondoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesFondo = event.target.files;

        if (filesFondo && filesFondo[0]) {
            const imageUrlFondo = URL.createObjectURL(filesFondo[0]);
            setfondo(imageUrlFondo);

            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const base64ImageFondo = e.target.result as string;
                    setFondoBase64(base64ImageFondo);
                }
            };
            reader.readAsDataURL(filesFondo[0]);
        }
    };



    const handlePerfilIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFondoClick = () => {
        if (inputRefFondo.current) {
            inputRefFondo.current.click();
        }
    };


    return (
        <div className='Registro'>
            <div className='login__bg--Uno'></div>
            <div className='login__bg--Tres'></div>
            <div className='Registro__logo'>
                <img src={img} alt="" />
            </div>
            <div className='Registro__Content'>
                {numeroPaso === 6 ? (
                    <div className="paso finalizacion">
                        <h2>🎉 ¡Felicitaciones! 🎉</h2>
                        <p>Ahora eres parte de Antopia. Inicia sesión para explorar este maravilloso mundo y conectar con otros amantes de las hormigas.</p>
                        <Link to="/">Volver al iniciar sesión</Link>
                    </div>
                ) : (
                    <>
                        <div className="Registro__Content-paso">
                            <p>Paso <span>{numeroPaso}</span> de 5</p>
                        </div>
                        <div className='login__container__title'>
                            <h1>Crea tu cuenta</h1>
                        </div>
                        <div className='Registro__Formulario'>
                            {numeroPaso === 1 && (
                                <div className='PasoReglas'>
                                    <IonIcon className='PasoReglasIcono' icon={shieldCheckmarkOutline} />
                                    <p>En Antopia, protegemos tu información. Al registrarte, recopilamos datos básicos para personalizar tu experiencia. Utilizamos tus datos solo para mejorar nuestros servicios y no los compartimos sin tu permiso. Implementamos medidas de seguridad para proteger tu información. Tienes control total sobre tus datos y puedes gestionarlos desde tu perfil.</p>
                                    <p>Al darla continuar y registrarse, aceptas los 
                                        <a href="https://about.antopia.org/es/ts" target='_blank'>Términos de servicio</a> 
                                        y la <a href="https://about.antopia.org/es/tp" target='_blank'> Política de privacidad</a>, 
                                        incluida la
                                        <a href="https://about.antopia.org/es/tc" target='_blank'>política de Uso de Cookies</a>.</p>
                                </div>

                            )}
                            {numeroPaso === 2 && (
                                <div className="paso">
                                    <div className="login__container__group">
                                        <input
                                            type='text'
                                            name='nombre'
                                            placeholder='Nombre de usuario'
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Nombre de usuario</label>
                                    </div>
                                    <div className="login__container__group">
                                        <input
                                            type='text'
                                            name='correo'
                                            placeholder='Correo electrónico'
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Correo electrónico</label>
                                    </div>
                                </div>
                            )}
                            {numeroPaso === 3 && (
                                <>
                                    <div className='configuracion-Perfil'>
                                        <div className='configuracion-portada registro-portada configuracion-registro-portada'>
                                            <img src={fondo || NoImagen} alt="" />
                                            <div className='configuracion-portada-bg' onClick={handleFondoClick}>
                                                <p> Clic para seleccionar una imagen de portada</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={inputRefFondo}
                                                name="fondo"
                                                onChange={handleFondoChange}
                                            />
                                        </div>
                                        <div className="foto-preview">
                                            <img src={fotoPerfilPreview || PerfilBlonco} alt="Foto de perfil" />
                                            <div className='foto-preview-bg' onClick={handlePerfilIconClick}>
                                                <p> Clic para seleccionar tu foto de perfil</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={inputRef}
                                                name="fotoPerfil"
                                                onChange={handleFotoPerfilChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {numeroPaso === 4 && (

                                <div className="paso frase">
                                    <p>Demuestra tu profundo cariño y fascinación por las hormigas en su maravilloso universo. ¡Libera tu creatividad y comparte una frase llena de amor!</p>
                                    <div className="login__container__group">
                                        <textarea
                                            name='frase'
                                            placeholder='Expresa tu pasión por las hormigas'
                                            onChange={(e) => setFrase(e.target.value)}
                                        />
                                    </div>

                                </div>
                            )}
                            {numeroPaso === 5 && (
                                <div className="paso pasocuatro">
                                    <h2>Necesitarás una contraseña</h2>
                                    <p>Asegúrate de que tenga 8 caracteres o más y una mayúscula.</p>
                                    <div className="login__container__group">
                                        <input
                                            type='password'
                                            name='contraseña'
                                            placeholder='*******'
                                            onChange={(e) => setContraseña(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Contraseña</label>
                                    </div>
                                    <div className="login__container__group">
                                        <input
                                            type='password'
                                            name='contraseñaDos'
                                            placeholder='*******'
                                            onChange={(e) => setContraseñaDos(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Confirmar contraseña</label>
                                    </div>

                                </div>

                            )}

                            <i className='mensaje'>{msg}</i>
                            <BotonSubmit texto={textBoton} isLoading={isLoading} onClick={() => handlenumeroPaso()} color="enviar" />
                        </div>
                        <Link to="/">Volver al inicio</Link>
                    </>
                )}
            </div>
            <div className='footernav'>
                <a href="https://about.antopia.org/es/ts" target='_blank'>Términos de servicio</a>
                <a href="https://about.antopia.org/es/tp" target='_blank'>Política de privacidad</a>
                <a href="https://about.antopia.org/es/tc" target='_blank'>Política de cookies</a>
                <a href="https://about.antopia.org" target='_blank'>Accesibilidad</a>
                <a href="https://about.antopia.org/es/ia" target='_blank'>Información de los anuncios</a>
                <a href="https://about.antopia.org" target='_blank'>Más...</a>
                <p>© 2023 Antopia. <span className='desarrollado'>Desarrollado por Steven Jocz</span></p>

            </div>

        </div >
    )
}

export default Registro