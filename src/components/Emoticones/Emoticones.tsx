import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import './Emoticones.css';
import { useState, useCallback } from "react";

interface Props {
    mostrarEmoticos: () => void;
    onEmojiSelect: (emoji: string) => void; // Nueva prop para enviar el emoji seleccionado
}

const Emoticones: React.FC<Props> = (props) => {
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
        props.onEmojiSelect(emojiData.emoji); // Enviar el emoji seleccionado al componente padre
        setShowPicker(false);
        console.log(showPicker);
    }, []);

    return (
        <div className='Emoticones'>
            <div className='Emoticones_cerrar'>
                <IonIcon className='Icono-cerrar' onClick={props.mostrarEmoticos} icon={closeCircleOutline} />
            </div>
            <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
            />
        </div>
    )
}

export default Emoticones;
