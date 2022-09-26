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

function addPendingMatchEasy(username) {
    const details = {
        username: username.username,
        difficulty: 'easy',
    };

    return orm.create(details);
}

function addPendingMatchMedium(username) {
    const details = {
        username: username.username,
        difficulty: 'medium',
    };

    return orm.create(details);
}

function addPendingMatchHard(username) {
    const details = {
        username: username.username,
        difficulty: 'hard',
    };

    return orm.create(details);
}

function deletePendingMatchById(params) {
    return orm.deleteById(params.id);
}
// testing only
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
