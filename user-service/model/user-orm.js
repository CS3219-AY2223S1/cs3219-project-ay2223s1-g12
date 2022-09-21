import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUser } from './repository.js';
import UserModel from './user-model.js';

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

// Return user from DB if exists
export async function getUser(username) {
    return UserModel.findOne({
        username,
    });
}

export async function generateAccessToken(user) {
    return jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' },
    ); // expire in 30s
}

export async function generateRefreshAccessToken(user) {
    return jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1800s' },
    ); // expire in 30 mins
}

export async function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return undefined;
        return user;
    });
}

export async function verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return undefined;
        const token = await generateAccessToken({ username: user.username });
        return token;
    });

export async function ormCheckUserExists(username) {
    try {
        const user = await findUser(username);
        console.log(user);
        if (user) {
            return true;
        }
        return false;
    } catch (err) {
        console.log('ERROR: Could not check for user');
        return { err };
    }
}
