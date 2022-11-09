// Set up mongoose connection
import mongoose from 'mongoose';

import 'dotenv/config';
import historyModel from './history-model.js';

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_CLOUD_URI_DEV;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function findRecord(username) {
    return historyModel.findOne({ username: username });
}

export async function createRecord(params) {
    // params contain a username and question
    console.log(params);
    return new historyModel(params);
}