import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ormCreateUser as _createUser, generateAccessToken, generateRefreshAccessToken } from '../model/user-orm.js';
import userModel from '../model/user-model.js';
import { hashSaltPassword, verifyPassword } from '../services.js';

// get config vars
dotenv.config();

let refreshTokens = []; // TODO: store refreshTokens in cache/db

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

        // if user does not exist
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. Invalid username.' });
        }

        const hashedPassword = user.password;
        const isCorrectPassword = await verifyPassword(req.body.password, hashedPassword);

        // if password mismatch
        if (!isCorrectPassword) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        const token = generateAccessToken(user);
        const refreshToken = generateRefreshAccessToken(user);
        // Store new refresh token in db
        refreshTokens.push(refreshToken);
        res.json({
            token: token,
            refreshToken: refreshToken
        });
    });
}

export async function authenticateToken(req, res) {
    // Testing auth
    const posts = [
        {
            username: 'david',
            title: 'Post 1'
        },
        {
            username: 'ethan',
            title: 'Post 2'
        }
    ]

    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.status(403)
        req.username = user.username
    })

    res.json(posts.filter(post => post.username == req.username));
}

export async function refreshToken(req, res) {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.status(401)
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'FORBIDDEN' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403)
        const token = generateAccessToken({ username: user.username })
        res.json({ token: token })
    })
}

export async function logout(req, res) {
    // Delete refreshToken from cache
    const index = refreshTokens.indexOf(req.body.token);
    if (index > -1) { // only splice array when item is found
        refreshTokens.splice(index, 1); // 2nd parameter means remove one item only
    }
    res.status(200).json({ message: 'Logout successful!' });
}

