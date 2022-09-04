import bcrpyt from 'bcrypt';

// hash and salt passwords
export async function hashSaltPassword(password) {
    const saltRounds = 10;
    const salt = await bcrpyt.genSalt(saltRounds);
    return bcrpyt.hash(password, salt);
}

/**
 * Returns true is the given password matches one in DB
 * @param {String} password given input
 * @param {String} hashed taken from DB
 */
export async function verifyPassword(password, hashed) {
    return bcrpyt.compare(password, hashed);
}
