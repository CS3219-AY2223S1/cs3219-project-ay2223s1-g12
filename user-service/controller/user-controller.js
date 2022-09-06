import { ormCreateUser as _createUser } from '../model/user-orm.js';
import userModel from '../model/user-model.js';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
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
    //Check for existing username
    userModel.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //Username does not exist
        if (!user) {
            res.status(400).send({ message: "Username does not exist!" });
            return;
        }

        res.status(200).send({ message: "Username exist!" });

    });

}
