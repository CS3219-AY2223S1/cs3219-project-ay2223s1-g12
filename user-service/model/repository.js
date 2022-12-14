// Set up mongoose connection
import mongoose from 'mongoose';

import UserModel from './user-model.js';
import 'dotenv/config';

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_CLOUD_URI_DEV;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
    return new UserModel(params);
}

export async function deleteUser(params) {
    return UserModel.findOneAndDelete({ username: params });
}

export async function findUser(param) {
    return UserModel.findOne({ username: param });
}
