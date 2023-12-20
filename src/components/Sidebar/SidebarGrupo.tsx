import { IonIcon } from '@ionic/react'
import { people, earth, calendar } from 'ionicons/icons';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Colonia, PerfilImagenes } from '../../models';
import { getImagenesColonia, getMiColonia } from '../../services';
import { format } from 'date-fns';
import { PublicacionesProvider } from '../../Context/PublicacionesContext';
import { ModalImagenesDos } from '../ModalImagenes';

const SidebarGrupo = () => {
    const userState = useSelector((store: AppStore) => store.user);
    const [grupo, setGrupo] = useState<Colonia | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [imagenesColonia, setImagenes] = useState([] as PerfilImagenes[]);
    const idColonia = location.pathname.split("/")[3];

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };
    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getMiColonia(Number(idColonia), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setGrupo(fetchedPerfiles[0]);

                } else {
                    setGrupo(null);
                }
            } catch (error) {
                console.error('Error al obtener el grupo:', error);
            }
            try {
                const imagen = await getImagenesColonia(parseInt(idColonia));
                if (imagen.length > 0) {
                    setImagenes(imagen);
                } else {
                    setImagenes([]);
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        fetchPerfil();
    }, [idColonia]);
    return (
        <div>
            <div className="sidebar-content">
                <div className="AboutColonia__header">
                    <h3>Información de la colonia</h3>
                    <p>Una comunidad donde todos pretendemos ser hormigas en una colonia de hormigas</p>
                    <div className="AboutColonia__header_info">
                        <IonIcon className='Icono-About' icon={people} />
                        <p>Solo los miembros pueden publicar, dar me gusta o comentar.</p>
                    </div>
                    <div className="AboutColonia__header_info">
                        <IonIcon className='Icono-About' icon={earth} />
                        <p><span>Todas las colonias son visibles públicamente.</span> Cualquiera puede unirse a esta colonia.</p>
                    </div>
                    <div className="AboutColonia__header_info">
                        <IonIcon className='Icono-About' icon={calendar} />
                        <p>Creado {format(new Date(grupo?.dt_creation || 0), "d 'de' MMMM 'de' yyyy")} por
                            <Link to={`/Home/Perfil/${grupo?.fk_tbl_user_creator}/${grupo?.name_creator.replace(/\s/g, '')}`}>
                                @{grupo?.name_creator.replace(/\s/g, '')}
                            </Link>
                        </p>

                    </div>
                    
                
                </div>
                <button><Link className='Link-About' to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/about`}>Más información</Link></button>
            </div>
            <div className="sidebar-content">

                <div className="sidebar-content-imagenes">
                    <h3>Imagenes recientes</h3>
                    {imagenesColonia.slice(-4).map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl.url}
                            alt={`Hormiga ${index}`}
                            onClick={() => openModal(index)}
                        />
                    ))}
                     <button><Link className='Link-About' to={`/Home/Colonias/${grupo?.id_colonies}/${grupo?.s_name.replace(/\s/g, '')}/fotos`}>Ver todo</Link></button>
                </div>

                {selectedImageIndex !== null && (
                    <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={4} hashtag="">
                        <ModalImagenesDos
                            imageUrls={imagenesColonia.slice(-4)}
                            currentIndex={selectedImageIndex}
                            onClose={closeModal}
                        />
                    </PublicacionesProvider>
                )}
            </div>
        </div >
    )
}

export default SidebarGrupo