import { ormCreateUser as _createUser } from '../model/user-orm.js';
import userModel from '../model/user-model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashSaltPassword, verifyPassword } from '../services.js';

// get config vars
dotenv.config();

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const hashedPassword = await hashSaltPassword(password);
            const resp = await _createUser(username, hashedPassword);
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
    }, async function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        const FAILED_MSG = 'Authentication failed. Invalid user or password.';

        // if user does not exist
        if (!user) {
            return res.status(401).json({ message: FAILED_MSG });
        }

        const hashedPassword = user.password;
        const isCorrectPassword = await verifyPassword(req.body.password, hashedPassword);

        // if password mismatch
        if (!isCorrectPassword) {
            return res.status(401).json({ message: FAILED_MSG });
        }
        
        const token = res.json({ token: jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' }) }); //expire 30 mins

        
        
    });

}
