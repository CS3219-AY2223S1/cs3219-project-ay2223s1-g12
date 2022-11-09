import orm from './orm.js';

const pendingMatchOrm = {
    addPendingMatchEasy: addPendingMatchEasy,
    addPendingMatchMedium: addPendingMatchMedium,
    addPendingMatchHard: addPendingMatchHard,
    deleteMatchByDifficulty: deleteMatchByDifficulty,
    deletePendingMatchById: deletePendingMatchById,
    deletePendingMatchByUsername: deletePendingMatchByUsername,
    getAvailableMatch: getAvailableMatch,
};

function addPendingMatchEasy(socketid, username) {
    const details = {
        socketid: socketid,
        username: username.username,
        difficulty: 'easy',
    };

    return orm.create(details);
}

function addPendingMatchMedium(socketid, username) {
    const details = {
        socketid: socketid,
        username: username.username,
        difficulty: 'medium',
    };

    return orm.create(details);
}

function addPendingMatchHard(socketid, username) {
    const details = {
        socketid: socketid,
        username: username.username,
        difficulty: 'hard',
    };

    return orm.create(details);
}

function deletePendingMatchById(socketid) {
    return orm.deleteById(socketid);
}

function deletePendingMatchByUsername(params) {
    return orm.deleteByUsername(params.username);
}

function deleteMatchByDifficulty(difficulty) {
    return orm.deleteMatchByDifficulty(difficulty);
}

function getAvailableMatch(difficulty) {
    return orm.getAvailableMatch(difficulty);
}

export default pendingMatchOrm;
