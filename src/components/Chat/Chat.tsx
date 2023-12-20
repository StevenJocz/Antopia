import { useState } from 'react';
import ChatView from './ChatView';
import { ChatColonia, ChatPrevia } from '.';

import './Chat.css'

interface Props {
    haddleVerChat: () => void;
}

const Chat: React.FC<Props> = (props) => {

    const [verPerviaChat, setVerPerviaChat] = useState(true);
    const [verViewChat, setVerViewChat] = useState(false);
    const [verViewColonia, setVerViewColonia] = useState(false);
    const [IdPerfil, setIdPerfil] = useState(0);
    const [IdColonia, setIdColonia] = useState(0);

    const handleVerPerviaChat = () => {
        setVerPerviaChat(!verPerviaChat)
        props.haddleVerChat()
    }

    const handleVerViewChat = (idPerfil: number) => {
        setVerViewChat(!verViewChat)
        setIdPerfil(idPerfil)
    }

    const handleVerColonia = (idColonia: number) => {
        setVerViewColonia(!verViewColonia)
        setIdColonia(idColonia)
    }

    return (
        <div className="Chat">
            <div className="Chat-center">
                {verViewChat ? (
                    <ChatView
                        idPerfil={IdPerfil}
                        handleVerViewChat={handleVerViewChat}
                        handleVerPerviaChat={handleVerPerviaChat}
                    />
                ) : verViewColonia ? (
                    <ChatColonia
                        idColonia={IdColonia}
                        handleVerColonia={handleVerColonia}
                        handleVerPerviaChat={handleVerPerviaChat}

                    />

                ) : verPerviaChat ? (
                    <ChatPrevia
                        handleVerPerviaChat={handleVerPerviaChat}
                        handleVerViewChat={handleVerViewChat}
                        handleVerColonia={handleVerColonia}
                    />
                ) : (

                    <div>hola</div>
                )
                }

            </div>
        </div>
    )
}

export default Chat