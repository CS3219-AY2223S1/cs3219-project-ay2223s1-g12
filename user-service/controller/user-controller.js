import {
    ormCreateUser as _createUser,
    ormCheckUserExists as _checkUserExists,
    ormFindUser as _findUser,
    ormUpdateUser as _updateUser,
    ormDeleteUser as _deleteUser,
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
const blacklistedTokens = [];

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

export async function deleteUser(req, res, next) {
    try {
        // delete the user by using username (alt: _id)
        const { username } = req.body;
        const { loggedInUser } = req;

        if (loggedInUser !== username) {
            return res.status(403).json({ message: 'Forbidden to delete a user that is not yourself!' });
        }

        // verify if user exists in database
        const user = await _findUser(username);
        if (!user) {
            return res.status(404).json({ message: 'Account deletion failed. User does not exist.' });
        }

        // TODO: blacklist the token so that user cannot log in with the same token again
        // Done in next() callback to logout

        const resp = await _deleteUser(username);
        if (resp.err) {
            return res.status(400).json({ message: 'Could not delete the user!' });
        }
        console.log(`Successfully deleted user - ${username}`);
        // res.status(200).json({ message: 'User account has been deleted!' });

        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when deleting user!' });
    }
}
export async function changePassword(req, res) {
    try {
        const { username, oldPassword, newPassword } = req.body;
        if (username && oldPassword && newPassword) {
            // verify user old password is correct
            const user = await _findUser(username);
            if (!user) {
                return res.status(400).json({ message: 'Authentication failed. User does not exist.' });
            }
            const isPasswordCorrect = await verifyPassword(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Authentication failed. Incorrect user or password provided.' });
            }
            console.log(`User ${username} has been authenticated.`);
            // store new password
            const hashedNewPassword = await hashSaltPassword(newPassword);
            const resp = await _updateUser(user, { username: username, password: hashedNewPassword });
            if (resp.err) {
                return res.status(400).json({ message: 'Could not update password!' });
            }
            console.log(`Updated password for user - ${username}`);
            return res.status(200).json({ message: 'Password has successfully been changed.' });
        }
        return res.status(400).json({ message: 'Username and/or Passwords are missing!' });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when updating user password!' });
    }
}

export async function loginUser(req, res) {
    // Check for existing username in db
    const user = await _findUser(req.body.username);

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

    // Token blacklisted
    const index = blacklistedTokens.indexOf(token);
    if (index > -1) { // Token is blacklisted
        return res.status(403).json({ message: 'Token blacklisted' });
    }

    req.loggedInUser = verifiedUser.username;

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
    // Add to token blacklist
    blacklistedTokens.push(req.cookies.token);
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
