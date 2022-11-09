const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('join-chat-service', async (roomid) => {
            socket.join(roomid);
            console.log('joined');
        });

        socket.on('message-from-client', (data) => {
            io.to(data.roomId).emit('get-message', data);
        });
    });
};

export default socketHandler;
