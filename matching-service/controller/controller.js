import orm from '../model/orm.js';

const httpMatchController = {
    addPendingMatch: addPendingMatch,
    findAllPendingMatches: findAllPendingMatches,
    findPendingMatchByUsername: findPendingMatchByUsername,
};

/** Adds pending match to the database. */
function addPendingMatch(req, res) {
    const pendingMatch = req.body;
    orm.create(pendingMatch).then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Retrieves all pending matches in the current database. */
function findAllPendingMatches(req, res) {
    orm.findAllPendingMatches().then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Finds pending match by username. */
function findPendingMatchByUsername(req, res) {
    orm.findPendingMatchByUsername(req.params.username).then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

export default httpMatchController;
