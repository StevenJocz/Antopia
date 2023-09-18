import { IonIcon } from '@ionic/react';
import { search, arrowBack } from 'ionicons/icons';
import './DescubreColonias.css';
import { Link } from 'react-router-dom';
import { getBuscarColonia } from '../../../services';
import { useState, useEffect } from 'react';
import { Colonia } from '../../../models';

const DescubreColonias = () => {
    const [respuesta, setRespuesta] = useState([] as Colonia[]);
    const [busqueda, setBusqueda] = useState<string>('colonia'); // Inicializar con "colonia"

    // Enviar la palabra inicial al servicio cuando se monte el componente
    useEffect(() => {
        async function enviarBusquedaInicial() {
            try {
                const resultado = await getBuscarColonia(busqueda);
                setRespuesta(resultado);
            } catch (error) {
                console.error('Error al consultar el servicio:', error);
            }
        }

        enviarBusquedaInicial();
    }, [busqueda]); // Se ejecutará cuando cambie la búsqueda

    // Actualizar el estado de búsqueda cuando el input cambie
    const handleInputValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.value != '') {
            setBusqueda(input.value);
        }
    }

    return (
        <div className="DescubreColonias">
            <div className='DescubreColonias-buscador'>
                <Link to={`/Home/Colonias/`} >
                    <IonIcon className='volver-icono' icon={arrowBack} />
                </Link>
                <input type="text"
                    placeholder='Buscar colonias'
                    onChange={handleInputValue}
                />
                <IonIcon className='DescubreColonias-buscador-icono' icon={search} />
            </div>
            <h2>Descubre Colonias</h2>
            <div className='DescubreColonias-contenedor'>
                {respuesta.map((colonia, index) => (
                    <Link
                        to={`/Home/Colonias/${colonia.s_name.replace(/\s/g, '')}`}
                        state={{ idColonia: colonia.id_colonies }}
                    >
                        <div className='DescubreColonias-contenedor-item' key={index}>

                            <div className='DescubreColonias-contenedor-item-img'>
                                <img src={colonia.s_photo} alt={colonia.s_name} />
                            </div>

                            <div className='DescubreColonias-contenedor-item-info' >
                                <h3>{colonia.s_name}</h3>
                                <p><span>{colonia.cantidadMembers}</span>  {colonia.cantidadMembers === 1 ? 'Miembro' : 'Miembros'}</p>
                                <div>
                                    <div className='MiGrupo-user'>
                                        {colonia?.userMembers.map((miembro) => (
                                            <img src={miembro.foto} alt={miembro.foto} key={miembro.foto} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DescubreColonias;
