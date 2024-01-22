

import { useEffect, useState } from 'react';
import Huevo from '../../assets/imagenes/huevo.png';
import Larva from '../../assets/imagenes/larva.png'
import Pupa from '../../assets/imagenes/pupa.png';
import Hormiga from '../../assets/imagenes/hormiga.png';
import Soldado from '../../assets/imagenes/soldado.png';
import Reina from '../../assets/imagenes/reina.png';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import './BarraProgreso.css';
import { getNivel } from '../../services';
import { PropagateLoader } from 'react-spinners';


const BarraProgreso = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [verNivel, setVerNivel] = useState(false);
    const [nivelAtual, setNivelAtual] = useState<string>('');
    const [nivelTexto, setNivelTexto] = useState<string>('');
    const [nivel, setNivel] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handdleNivel = () => {
        setVerNivel(!verNivel);
    };

    const niveles = [
        { id: 1, imagen: Huevo },
        { id: 2, imagen: Larva, },
        { id: 3, imagen: Pupa },
        { id: 4, imagen: Hormiga },
        { id: 5, imagen: Soldado },
        { id: 6, imagen: Reina },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nivel = await getNivel(userState.IdPerfil);
                setNivel(nivel.id_level);
                const nivelEncontrado = niveles.find((n) => n.id === nivel.id_level);

                if (nivelEncontrado) {
                    setNivelAtual(nivelEncontrado.imagen);
                    setNivelTexto(nivel.s_level);
                } else {
                    setNivelAtual('');
                    setNivelTexto('');
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error al consultar el servicio:', error);
            }
        };

        fetchData();
    }, [userState.IdPerfil, niveles]);



    return (
        <div className='BarraProgreso'>
            {isLoading ? ( // Muestra el loader si los niveles aún no se han cargado completamente
                <div className='Cargado-BarraProgreso'>
                    <PropagateLoader color="#fff" speedMultiplier={1} size={30} />
                </div>
            ) : (
                <>
                    <div className='BarraProgreso-nivel'>
                        <div className='BarraProgreso-contect-imagen'>
                            <img src={nivelAtual} className='' alt="" onClick={handdleNivel} />
                        </div>
                        <h3>Nivel {nivelTexto}</h3>
                    </div>
                    {verNivel && (
                        <div className='BarraProgreso-contect-bg'>
                            <div className='BarraProgreso-contect'>
                                <h3>¡Tu nivel es {nivelTexto}! </h3>
                                <IonIcon className='BarraProgreso-contect-cerrar' onClick={handdleNivel} icon={closeCircleOutline} />
                                <div className='BarraProgreso-contect-imagenDOS'>
                                    <img src={nivelAtual} className='' alt="" />
                                </div>
                                {nivel == 6 ? (
                                    <>
                                        <h2>🎉 ¡Felicitaciones! 🎉</h2>
                                        <p>Como nivel Reina, tu papel es fundamental para construir y mantener este vibrante espacio. Aquí te dejo un vistazo a tus responsabilidades y cómo tu liderazgo transforma nuestra comunidad de Antopia:</p>
                                        <p>🌐 <span>Funciones exclusivas:</span> Ahora prodrás crear tus propias colonias.</p>
                                        <p>🛡 <span>Moderación Justa:</span> Tu labor incluye asegurar un entorno seguro y respetuoso, eliminando contenido inapropiado y fomentando la convivencia positiva.</p>
                                        <p>🔧 <span>Facilitador del Diálogo:</span> Anima a todos a participar y compartir sus pensamientos. Tu tarea es crear un ambiente donde cada voz sea valorada.</p>
                                        <p> 🌟 <span>Reconocimiento y Agradecimiento:</span> Celebra los logros de los miembros y agradece sus contribuciones. Un pequeño gesto puede tener un gran impacto.</p>
                                        <h4>Recuerda, tu participación activa y liderazgo inspiran a otros. ¡Sigamos construyendo esta comunidad excepcional!</h4>

                                    </>

                                ) : (
                                    <>
                                        <h4>Cada publicación te acerca a nuevos niveles de grandeza. ¿Qué ganas al subir?</h4>
                                        <p>📈 <span>Mayor visibilidad:</span> Más ojos en tus publicaciones.</p>
                                        <p>🏆 <span>Logros exclusivos:</span> Insignias y reconocimientos.</p>
                                        <p>🌐 <span>Funciones exclusivas:</span> Si llegas al nivel reina, podrás crear tus propias colonias.</p>
                                        <p>¡Al alcanzar el nivel Reina, no solo podrás crear tus propias colonias, sino que también te convertirás en administrador de Antopia! Descubre el poder de liderar y construir, ¡tu reino te espera! 🌟✨</p>
                                        <h4>¿Cómo llegar más alto?</h4>
                                        <p>📝 Publica con pasión.</p>
                                        <p>🤝 Conecta con la comunidad.</p>
                                        <p>🔄 Sigue sumando puntos.</p>
                                        <p>Tu ayuda es la chispa que hará crecer nuestra comunidad. Juntos, podemos construir un espacio donde el conocimiento fluye libremente. Imagina una gran comunidad donde cada aporte cuenta, donde aprender es un viaje compartido.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}



        </div>
    );
};

export default BarraProgreso;
