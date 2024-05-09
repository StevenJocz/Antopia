import { useEffect, useState } from "react";
import { Barnner, Recomendados } from "../Tiendas";
import { getImagenesPublicaciones, getTopPublicaciones } from "../../services";
import { ImagenesPublicacion, PerfilImagenes, TopPublicacion } from "../../models";
import { format } from "date-fns";
import { ModalImagenesDos } from "../ModalImagenes";
import { PublicacionesProvider } from "../../Context/PublicacionesContext";
import { Link } from "react-router-dom";


interface Props {
    idTipo: number;
}

const SidebarPublicacion: React.FC<Props> = (props) => {
    const [top, setTop] = useState([] as TopPublicacion[]);
    const [imagenes, setImagenes] = useState([] as ImagenesPublicacion[]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<PerfilImagenes[]>([]);

    useEffect(() => {
        consultarTop();
        consultarImagenes();
    }, [props.idTipo]);

    const consultarTop = async () => {
        try {
            const resultadoTop = await getTopPublicaciones(props.idTipo);
            setTop(resultadoTop);
        } catch (error) {
            console.error('Error al obtener el grupo:', error);
        }
    };

    const consultarImagenes = async () => {
        try {
            const resultadoImagenes = await getImagenesPublicaciones(props.idTipo);
            setImagenes(resultadoImagenes);
        } catch (error) {
            console.error('Error al obtener el grupo:', error);
        }
    };

    const openModal = (index: number, imagenes: ImagenesPublicacion[]) => {
        const imagenData = imagenes.map(img => ({
            idPublicacion: img.IdPublicacion,
            url: img.Url
        }));
        setSelectedImage(imagenData);
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };


    return (
        <div>

            <div className="sidebar-content">
                <h3>Tops Publicaciones </h3>
                {top.map((top, index) => (
                    <Link to={`/Home/Publicacion/${top.IdPublicacion}/${encodeURIComponent(top.Titulo.toLowerCase().replace(/ /g, '-'))}`}>
                        <div className="SidebarPublicacion-conte" key={index}>
                            <h4>{index + 1}</h4>
                            <div className="SidebarPublicacion-text">
                                <h1>{top.Titulo}</h1>
                                <div className="SidebarPublicacion-perfil">
                                    <img src={top.Foto} alt="" />
                                    <p>{top.NombrePerfil}</p>
                                    <p>-</p>
                                    <p>{format(new Date(top.FechaPublicacion), "dd 'de' MMMM")}  </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Barnner />
            <div className="sidebar-content">
                <h3>Imagenes</h3>
                <div className="SidebarPublicacion-imagenes">
                    {imagenes.slice(0, 3).map((imagen, index) => (
                        <img
                            src={imagen.Url}
                            alt="hormigas" key={index}
                            onClick={() => openModal(index, imagenes)}
                            loading="lazy" />
                    ))}

                    {imagenes.length > 3 && (
                        <div className="ExtraImagesInfo" onClick={() => openModal(3, imagenes)}>
                            <p>+{imagenes.length - 3} </p>
                            <img
                                src={imagenes[3].Url}
                                alt=""
                                className=""
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </div>
            <Recomendados />
            {selectedImageIndex !== null && (
                <PublicacionesProvider idTipo={0} idPerfil={0} idColonia={0} opcion={3} hashtag="">
                    <ModalImagenesDos
                        imageUrls={selectedImage}
                        currentIndex={selectedImageIndex}
                        onClose={closeModal}
                    />
                </PublicacionesProvider>
            )}
        </div>
    )
}

export default SidebarPublicacion