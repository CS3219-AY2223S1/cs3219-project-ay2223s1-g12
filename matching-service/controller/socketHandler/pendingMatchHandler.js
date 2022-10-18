import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`socket id is ${socket.id}`);
        console.log(socket.rooms);

        socket.on('match-easy', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('easy');

            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                // emit succcess event to the matched users
                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                // else --> match and delete
                pendingMatchController.deleteMatchByDifficulty('easy');
            }
        });

        // join room based on socketid
        socket.on('join-room', async (socketid) => {
            socket.join(socketid);
            console.log('joined');
        });

        socket.on('match-medium', async (data) => {
            const user = await pendingMatchController.getAvailableMatch('medium');
            if (user === null) {
                pendingMatchController.addPendingMatchMedium(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                pendingMatchController.deleteMatchByDifficulty('medium');
            }
        });

        socket.on('match-hard', async (data) => {
            socket.join('hard-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('hard');
            if (user === null) {
                pendingMatchController.addPendingMatchHard(socket.id, data);
            } else {
                const currentSocketId = user.dataValues.socketid;

                io.to(socket.id).emit('match-success', currentSocketId, socket.id);
                io.to(currentSocketId).emit('match-success', currentSocketId, socket.id);

                pendingMatchController.deleteMatchByDifficulty('hard');
            }
        });

        // no match found after 30s ends
        socket.on('no-match-found', () => {
            pendingMatchController.deletePendingMatchById(socket.id);
        });

        // pending match is cancelled before 30s ends
        socket.on('match-cancel', () => {
            pendingMatchController.deletePendingMatchById(socket.id);
        });

        // leaves room after matched and already in the same room
        socket.on('leave-room', async (socketRoomId) => {
            socket.leave(socketRoomId);
        });
    });
};

export default pendingMatchHandler;
