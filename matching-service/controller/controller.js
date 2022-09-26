import orm from '../model/orm.js';

const httpMatchController = {
    addPendingMatch: addPendingMatch,
    deleteByUsername: deleteByUsername,
    findAllPendingMatches: findAllPendingMatches,
    findPendingMatchByUsername: findPendingMatchByUsername,
    updatePendingMatch: updatePendingMatch,
    updatePendingMatchDifficulty: updatePendingMatchDifficulty,
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

/** Deletes pending match from the database by username. */
function deleteByUsername(req, res) {
    orm.deleteByUsername(req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfuly',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

function deleteById(req, res) {
    orm.deleteById(req.params.id).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match deleted successfully',
                pendingMatch: data,
            });
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

/** Updates an existing pending match by information. */
function updatePendingMatch(req, res) {
    orm.updatePendingMatch(req.body, req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfully!',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Updates an existing pending match difficulty level. */
function updatePendingMatchDifficulty(req, res) {
    orm.updatePendingMatchDifficulty(req.body, req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfully!',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

export default httpMatchController;