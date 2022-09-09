import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser } from './repository.js';

// get config vars
dotenv.config();


// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({ username, password });
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export function generateAccessToken(user) {
    return jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }); //expire 30 mins
}

export function generateRefreshAccessToken(user) {
    return jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1800s' }); //expire 30 mins
}

export async function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.status(403)
        return user;
    })
}
