import {
    getUser,
    ormCreateUser as _createUser,
    ormCheckUserExists as _checkUserExists,
} from '../model/user-orm.js';
import {
    hashSaltPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
} from '../services.js';

const allowedRefreshTokens = []; // TODO: store allowedRefreshTokens in cache/db

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const isUserExist = await _checkUserExists(username);
            if (isUserExist) {
                console.log(`Account Creation Failed due to duplicate username - ${username}`);
                return res.status(409).json({ message: 'Duplicate username. Could not create a new user.' });
            }

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
    // Check for existing username in db
    const user = await getUser(req.body.username);

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

    const token = await generateAccessToken(user);
    const refreshToken = await generateRefreshAccessToken(user);
    // Store new refresh token in db
    allowedRefreshTokens.push(refreshToken);

    // Store token in cookie
    res.cookie('token', token, { expires: new Date(Date.now() + (0.5 * 60 * 1000)), httpOnly: true });
    res.cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + (30 * 60 * 1000)), httpOnly: true });

    return res.status(200).json({
        message: `${user.username} has been authenticated`,
        token,
        refreshToken,
    });
}

// Authenticate Bearer Token
export async function authenticateToken(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    const verifiedUser = await verifyAccessToken(token);

    if (!verifiedUser) return res.status(401).json({ message: 'Authentication failed.' });

    return res.status(200).json({ message: `Authenticated ${verifiedUser.username}` });
}

// Authenticate Cookie Token
export async function authenticateCookieToken(req, res, next) {
    const { token } = req.cookies;
    // Cookie expired
    if (!token) return res.status(403).json({ message: 'You must be logged in first!' });

    // Token expired
    const verifiedUser = await verifyAccessToken(token);
    if (!verifiedUser) return res.status(401).json({ message: 'Authentication failed.' });

    return next();
}

export async function refreshOldToken(req, res) {
    const { refreshToken } = req.body;
    if (refreshToken == null) return res.status(401);
    if (!allowedRefreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'FORBIDDEN' });
    }
    const newAccessToken = await verifyRefreshToken(refreshToken);
    if (!newAccessToken) return res.status(401).json({ message: 'Failed to verify refresh token.' });

    return res.json({ token: newAccessToken });
}

export async function logout(req, res) {
    // TODO: Add to token blacklist
    // Delete refreshToken from cache
    const index = allowedRefreshTokens.indexOf(req.cookies.refreshToken);
    if (index > -1) { // only splice array when item is found
        allowedRefreshTokens.splice(index, 1); // 2nd parameter means remove one item only
    } else {
        return res.status(403).json({ message: 'Logout failed!' });
    }

    // Delete cookies
    res.clearCookie('token');
    res.clearCookie('refreshToken');

    return res.status(200).json({ message: 'Logout successful!' });
}
