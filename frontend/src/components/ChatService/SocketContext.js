import { createContext } from 'react';
import { io } from 'socket.io-client';

let socket;

const initSocket = () => {
    socket = io('http://localhost:8003');
    return socket;
}

const getSocket = () => {
    if (!socket) {
        initSocket();
    }
    return socket;
}

export const SocketContext = createContext({
    getSocket: getSocket
});
