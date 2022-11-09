import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// get config vars
dotenv.config();

// hash and salt passwords
export async function hashSaltPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}

/**
 * Returns true is the given password matches one in DB
 * @param {String} password given input
 * @param {String} hashed taken from DB
 */
export async function verifyPassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}

export function verifyPasswordStrength(password) {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return password.match(pwRegex) !== null;
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
}
