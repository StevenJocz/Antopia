import { Link, useLocation } from "react-router-dom";
import { useDiarioContext } from "../../Context/DiarioContext";
import { useEffect, useState } from "react";
import { Colonia, InfoPerfil } from "../../models";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { getPerfil, getUserColonias } from "../../services";
import comentar from '../../assets/imagenes/comentar.png';
import { PublicacionesProvider } from "../../Context/PublicacionesContext";
import { ModalImagenesDos } from "../ModalImagenes";
import { Barnner } from "../Tiendas";

const SidebarPerfil = () => {

    const { diarioData } = useDiarioContext();
    const location = useLocation();
    const idPerfil = location.pathname.split("/")[3];
    const Perfil = location.pathname.split("/")[4];
    const [perfil, setPerfil] = useState<InfoPerfil | null>(null);
    const userState = useSelector((store: AppStore) => store.user);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [listColonia, setListColonia] = useState<Colonia[]>([]);

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const fetchedPerfiles = await getPerfil(Number(idPerfil), userState.IdPerfil);
                if (fetchedPerfiles.length > 0) {
                    setPerfil(fetchedPerfiles[0]);
                } else {
                    setPerfil(null);
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }

        const fetchUserColonias = async () => {
            try {
                const colonias: Colonia[] = await getUserColonias(Number(idPerfil));
                setListColonia(colonias);
            } catch (error) {
                console.error('Error al obtener las colonias del usuario:', error);
            }
        };

        fetchUserColonias();

        fetchPerfil();

    }, [idPerfil]);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };




    return (
        <div>
            <div className="sidebar-content">
                <h3>Imagenes </h3>
                <div className="SidebarPublicacion-imagenes">
                    {perfil?.PerfilImagenes && perfil?.PerfilImagenes.length > 0 ? (
                        <>
                            {perfil?.PerfilImagenes.slice().reverse().slice(0, 3).map((imageUrl, index, array) => (
                                <img
                                    key={array.length - 1 - index}
                                    src={imageUrl.url}
                                    alt={`Hormiga ${array.length - 1 - index}`}
                                    onClick={() => openModal(index)}
                                    loading="lazy"
                                />
                            ))}
                            {perfil?.PerfilImagenes && perfil.PerfilImagenes.length > 3 && (
                                <div className="ExtraImagesInfo" onClick={() => openModal(3)}>
                                    <p>+{perfil.PerfilImagenes.length - 3} </p>
                                    <img
                                        src={perfil.PerfilImagenes[3].url}
                                        alt=""
                                        className=""
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='sincomentarios'>
                            <p> ¡En este momento, el usuario no dispone de ninguna imagen para mostrar¡ </p>
                            <img src={comentar} alt="" />
                        </div>
                    )}

                </div>
            </div>
            <Barnner/>
            <div className="sidebar-content">
                <h3>Diarios</h3>
                <div className='Diario-nav'>
                    {diarioData.length > 0 ? (
                        <>
                            {diarioData.slice(0, 3).map((diario, index) => (
                                <div className="SidebarPublicacion-conte" key={index}>
                                    <h4>{index + 1}</h4>
                                    <div className="SidebarPublicacion-text">
                                        <h1>{diario.diario}</h1>
                                        <p>Última actualización 13 de January</p>
                                    </div>
                                </div>
                            ))}
                            <Link to={`/Home/Perfil/${idPerfil}/${Perfil}/Diarios`}>
                                <button>Ver todos los diarios</button>
                            </Link>
                        </>
                    ) : (
                        <button>Aún no ha comenzado el viaje diario</button>
                    )}

                </div>
            </div>

            <div className="sidebar-content">
                <h3>Colonias</h3>
                {listColonia.map(colonia => (
                    <Link to={`/Home/Colonias/${colonia.id_colonies}/${colonia.s_name.replace(/\s/g, '')}`} key={colonia.id_colonies}>
                        <div className="SidebarPerfil-Colonias">
                            <img src={colonia.s_photo} alt={colonia.s_name} loading="lazy"/>
                            <div className="">
                                <h1>{colonia.s_name}</h1>
                                <p>{colonia.cantidadMembers} miembros - {colonia.points} puntos</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

            {selectedImageIndex !== null && (
                <PublicacionesProvider idTipo={0} idPerfil={0} idColonia={0} opcion={3} hashtag="">
                    <ModalImagenesDos
                        imageUrls={perfil?.PerfilImagenes.slice().reverse() ?? []}
                        currentIndex={selectedImageIndex}
                        onClose={closeModal}
                    />
                </PublicacionesProvider>
            )}
        </div>
    )
}

export default SidebarPerfil