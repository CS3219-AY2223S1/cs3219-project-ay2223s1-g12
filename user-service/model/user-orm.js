import { createUser, deleteUser, findUser } from './repository.js';

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

export async function ormDeleteUser(username) {
    try {
        const deletedUser = await deleteUser(username);
        console.log(deletedUser);
        if (deletedUser) {
            return true;
        }
        return false;
    } catch (err) {
        console.log('ERROR: Could not delete user');
        return { err };
    }
}

export async function ormUpdateUser(user, changes) {
    try {
        const { username, password } = changes;
        const updatedUser = user;
        updatedUser.username = username;
        updatedUser.password = password;
        updatedUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not update user');
        return { err };
    }
}

export async function ormFindUser(username) {
    try {
        const user = await findUser(username);
        console.log(user);
        return user;
    } catch (err) {
        console.log('ERROR: Could not find user');
        return { err };
    }
}

export async function ormCheckUserExists(username) {
    try {
        const user = await ormFindUser(username);
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
