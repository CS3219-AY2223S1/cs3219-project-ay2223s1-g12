import pendingMatchController from '../pendingMatchController.js';

const pendingMatchHandler = (io) => {
    io.on('connection', (socket) => {
        socket.on('match-easy', async (data) => {
            // note: maybe need to join from client side?
            socket.join('easy-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('easy');
            // if no match --> add to db
            if (user === null) {
                pendingMatchController.addPendingMatchEasy(data, socket.rooms);
            } else {
                io.to('easy-waiting-room').emit('match-success', socket.rooms);
                // else --> match and delete
                pendingMatchController.deleteMatchByDifficulty('easy');
            }
        });

        socket.on('match-medium', async (data) => {
            socket.join('medium-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('medium');
            if (user === null) {
                pendingMatchController.addPendingMatchMedium(data, socket.rooms);
            } else {
                io.to('medium-waiting-room').emit('match-success', socket.rooms);
                pendingMatchController.deleteMatchByDifficulty('medium');
            }
        });

        socket.on('match-hard', async (data) => {
            socket.join('hard-waiting-room');
            const user = await pendingMatchController.getAvailableMatch('hard');
            if (user === null) {
                pendingMatchController.addPendingMatchHard(data, socket.id);
            } else {
                pendingMatchController.deleteMatchByDifficulty('hard');
                io.to('hard-waiting-room').emit('match-success', socket.id);
            }
        });

        // no match found before 30s
        // socket.on('no-match-found', (id) => {
        //     pendingMatchController.deletePendingMatchById(id);
        // });

        // socket.on('no-match-found', () => {
        //     // pendingMatchController.deleteOutstandingMatch(socket.id);
        //     PendingMatch.destroy({ where: { socketId: socket.id } });
        // });

        // pending match is cancelled before 30s ends
        // alternative idea: a particular-room receive cancel-match event
        // then destroy all pending match in that room
        socket.on('cancel-match', (id) => {
            pendingMatchController.deletePendingMatchById(id);
        });

        // leaves room after matched
        // takes room id
        // emit event to that room and destroy all matches in that room
        socket.on('leave-room', () => {});
    });
};

export default pendingMatchHandler;
