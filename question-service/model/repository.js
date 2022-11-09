// Set up mongoose connection
import mongoose from 'mongoose';

import QuestionModel from './question-model.js';
import 'dotenv/config';

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_CLOUD_URI_DEV;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion(params) {
    return new QuestionModel(params);
}

export async function deleteQuestion(params) {
    return QuestionModel.findOneAndDelete({ QuestionTitle: params });
}

export async function findQuestionRandomly(params) {
    // find subset of data then return one randomly
    const questions = await QuestionModel.where(params).limit(20);
    const count = questions.length;
    const random = Math.floor(Math.random() * count);
    return questions[random];
}
