import { ormCreateUser as _createUser } from '../model/user-orm.js';
import userModel from '../model/user-model.js';

import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({ message: 'Could not create a new user!' });
            }
            console.log(`Created new user ${username} successfully!`);
            return res.status(201).json({ message: `Created new user ${username} successfully!` });
        }
        return res.status(400).json({ message: 'Username and/or Password are missing!' });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when creating new user!' });
    }
}

export async function loginUser(req, res) {
    //Check for existing username in db
    userModel.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // TODO: implement comparePassword() hashing
        // if (!user || !user.comparePassword(req.body.password)) {
        if (!user || (user.password != req.body.password)) { // if user does not exist or password mismatch
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ username: user.username }, 'JWT_SECRET') });
    });

}
