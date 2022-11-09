const globalHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
    });
};

export default globalHandler;
