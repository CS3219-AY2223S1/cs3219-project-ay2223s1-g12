import { ormCreateUser as _createUser, ormDeleteUser as _deleteUser } from '../model/user-orm.js';
import { hashSaltPassword } from '../services.js';

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

export async function deleteUser(req, res) {
    try {
        // delete the user by using username (alt: _id)
        const { username } = req.body;

        // TODO: verify if user exists in database

        // TODO: blacklist the token so that user cannot log in with the same token again

        const resp = await _deleteUser(username);
        if (resp.err) {
            return res.status(400).json({ message: 'Could not delete the user!' });
        }
        console.log(`Successfully deleted user - ${username}`);
        return res.status(200).json({ message: 'User account has been deleted!' });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when deleting user!' });
    }
}
