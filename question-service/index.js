import express from 'express';
import cors from 'cors';
import { generateNewQuestion, retrieveQuestion } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());

const router = express.Router();

router.get('/', retrieveQuestion);
router.get('/generateNew', generateNewQuestion);

app.use('/api/questions', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8002, () => console.log('question-service listening on port 8002'));
