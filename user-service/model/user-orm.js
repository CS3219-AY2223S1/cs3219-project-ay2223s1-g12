import { createUser, findUser } from './repository.js';

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
