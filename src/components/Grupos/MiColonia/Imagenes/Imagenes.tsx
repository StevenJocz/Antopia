import { useEffect, useState } from "react";
import { ModalImagenesDos } from "../../../ModalImagenes";
import { PerfilImagenes } from "../../../../models";
import { getImagenesColonia } from "../../../../services";
import { useLocation } from "react-router-dom";
import './Imagenes.css';
import { PublicacionesProvider } from "../../../../Context/PublicacionesContext";

const Imagenes = () => {

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [imagenesColonia, setImagenes] = useState([] as PerfilImagenes[]);

    const location = useLocation();


    const idgrupo = location.pathname.split("/")[3];


    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };


    useEffect(() => {
        async function fetchPerfil() {
            try {
                const imagen = await getImagenesColonia(parseInt(idgrupo));
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
        
    }, [imagenesColonia]);


    return (
        <div className='Imagenes'>
            <h2>Fotos</h2>
            <div className="Imagenes-content">
                {imagenesColonia.slice().reverse().map((imageUrl, index, array) => (
                    <img
                        key={array.length - 1 - index}
                        src={imageUrl.url}
                        alt={`Hormiga ${array.length - 1 - index}`}
                        onClick={() => openModal(array.length - 1 - index)}
                    />
                ))}
            </div>
            {selectedImageIndex !== null && (
                <PublicacionesProvider idTipo={5} idPerfil={0} idColonia={0} opcion={4} hashtag="">
                    <ModalImagenesDos
                        imageUrls={imagenesColonia}
                        currentIndex={selectedImageIndex}
                        onClose={closeModal}
                    />
                </PublicacionesProvider>

            )}
        </div>
    )
}

export default Imagenes