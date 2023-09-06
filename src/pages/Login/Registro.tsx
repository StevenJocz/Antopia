import img from '../../assets/imagenes/Logoants.png'
import PerfilBlonco from '../../assets/imagenes/perfil-blanco.png'
import NoImagen from '../../assets/imagenes/NoImagen.png'
import './Login.css'
import { BotonSubmit } from '../../components/Boton';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostRegistrarUser } from '../../services';



const Registro = () => {
    const [numeroPaso, setnumeroPaso] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputRefFondo = useRef<HTMLInputElement | null>(null);
    const [textBoton, setTextBoton] = useState('Siguiente');

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');

    const [fechaNacimiento, setFechaNacimeiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [genero, setGenero] = useState('');

    const [fondo, setfondo] = useState('');
    const [fotoPerfilPreview, setFotoPerfilPreview] = useState('');

    const [fotoPerfilBase64, setFotoPerfilBase64] = useState('');
    const [fondoBase64, setFondoBase64] = useState('');

    const [contraseña, setContraseña] = useState('');

    const [frase, setFrase] = useState('');

    const handlenumeroPaso = () => {
        setIsLoading(true);
        if (numeroPaso === 1) {
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
            setTextBoton('Sigueinte');
            setnumeroPaso(numeroPaso + 1);
            setIsLoading(false);

        }
        else if (numeroPaso === 2) {
            if (fechaNacimiento === '') {
                setMsg('* La fecha de nacimiento es requerida');
                setIsLoading(false);
                return;
            }
            if (telefono === '') {
                setMsg('* El teléfono es requerido');
                setIsLoading(false);
                return;
            }
            if (telefono.length < 7) {
                setMsg('* El teléfono no es válido');
                setIsLoading(false);
                return;
            }
            if (genero === '') {
                setMsg('* El género es requerido');
                setIsLoading(false);
                return;
            }
            setMsg('');
            setTextBoton('Sigueinte');
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

            if (frase.length < 30) {
                setMsg('* ¡Tu pasión por las hormigas merece palabras más extensas! Deja que tu inspiración fluya y comparte una frase que refleje tu amor de manera más completa.');
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
            setMsg('');

            CreateUser()
            
            setIsLoading(false);

        }
    };


    const CreateUser = async () => {
        try {

            const userData = {
                id: 0,
                s_user_name: nombre,
                dt_user_birthdate: new Date(fechaNacimiento + 'T00:00:00Z').toISOString(),
                s_user_gender: genero,
                fk_user_address_city: 1, 
                s_user_cellphone: telefono,
                s_user_email: correo,
                Password: contraseña,
                s_userProfile: nombre.replace(/\s+/g, ''), 
                s_userPhoto: fotoPerfilBase64,
                s_userFrontpage: fondoBase64,
                s_frase: frase,
                fk_tblRol: 2, 
            };

            const result = await PostRegistrarUser(userData);
            if (result.resultado === false) {
                
                setMsg(result.msg);

            } else {
                setnumeroPaso(numeroPaso + 1);

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
        <div className='login Registro'>
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
                                <div className="paso">
                                    <div className="login__container__group">
                                        <input
                                            type='text'
                                            name='nombre'
                                            placeholder='Nombre'
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Nombre</label>
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
                            {numeroPaso === 2 && (
                                <div className="paso">
                                    <div className="login__container__group">
                                        <input
                                            type='date'
                                            name='fechaNacimiento'
                                            placeholder='Fecha de nacimiento'
                                            onChange={(e) => setFechaNacimeiento(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Fecha de nacimiento</label>
                                    </div>
                                    <div className="login__container__group">
                                        <input
                                            type='number'
                                            name='Teléfono'
                                            placeholder='Teléfono'
                                            onChange={(e) => setTelefono(e.target.value)}
                                        />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label>Teléfono</label>
                                    </div>
                                    <div className="login__container__group select">
                                        <label>Sexo</label>
                                        <select
                                            name="genero"
                                            onChange={(e) => setGenero(e.target.value)}>
                                            <option value="Masculino">Seleccione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {numeroPaso === 3 && (
                                <>
                                    <div className='configuracion-Perfil'>
                                        <div className='configuracion-portada'>
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
                                <div className="paso">
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
                                    <p className='Aceptar'>Al hacer clic en "Registrarte", aceptas nuestras <span>Condiciones</span> , la <span>Política de privacidad</span>  y  <span> la Política de cookies</span>.</p>
                                </div>
                            )}

                            <i className='mensaje'>{msg}</i>

                            <BotonSubmit texto={textBoton} isLoading={isLoading} onClick={() => handlenumeroPaso()} color="guardar" />
                        </div>
                        <Link to="/">Volver al iniciar sesión</Link>
                    </>
                )}
            </div>
        </div >
    )
}

export default Registro