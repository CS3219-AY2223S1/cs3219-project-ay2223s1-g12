import React, { useContext, useEffect, useState, useRef } from 'react';
import Message from './components/Message';
import { SocketContext } from './SocketContext'

import './ChatDisplay.css';

const ChatDisplay = (props) => {
    // get roomId
    const roomId = props.roomId;
    
    // get socket
    const { getSocket } = useContext(SocketContext);
    let socket = getSocket();

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.connected);
        });

        socket.emit('join-chat-service', roomId);
    }, []);

    useEffect(() => {
        socket.on('get-message', (data) => {
            setArrivalMessage({
                text: data.text,
                owner: data.socketid === socket.id
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && 
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMessage.trim().length !== 0) {
            socket.emit('message-from-client', { roomId: roomId, text: newMessage, socketid: socket.id });
            setNewMessage('');
        }
        // socket.emit('message-from-client', { roomId: roomId, text: newMessage, socketid: socket.id });
        // setNewMessage('');
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 && newMessage.trim().length !== 0) {
            handleSubmit(event);
        }
    }

    return (
        <React.Fragment>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map((m) => (
                            <div ref={scrollRef}>
                                <Message 
                                    message={m.text} 
                                    own={m.owner}    
                                />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput" 
                            placeholder="Message" 
                            onChange={(event) => setNewMessage(event.target.value)}  
                            onKeyDown={handleKeyPress}                           
                            value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChatDisplay;
