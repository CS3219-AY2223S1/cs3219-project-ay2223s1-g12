import {
    ormCreateQuestion as _createQuestion,
    ormCheckQuestionExists as _checkQuestionExists,
    ormFindQuestionRandomly as _findQuestionRandomly,
} from '../model/question-orm.js';

export async function createQuestion(req, res, next) {
    try {
        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when creating new Question!' });
    }
}

export async function deleteQuestion(req, res, next) {
    try {
        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when deleting Question!' });
    }
}

export async function retrieveQuestion(req, res) {
    try {
        const level = req.query.level;
        if (!level) {
            console.log('WARNING: No difficulty level was passed in');
        }
        const qn = await _findQuestionRandomly(level);
        return res.status(200).json({ message: `Successfully retrieved ${level} question!`, question: qn});
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when retrieving question!' });
    }
}

export async function generateNewQuestion(req, res) {
    try {
        const { currQuestionTitle } = req.body;
        if (!currQuestionTitle) {
            return res.status(400).json({ message: `Missing Current Question Title!` });
        }
        const level = req.query.level;
        const qn = await _findQuestionRandomly(level, currQuestionTitle);
        return res.status(200).json({ message: `Successfully generated new ${level} question!`, question: qn});
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when generating new question!' });
    }
}

