import express from 'express';
import cors from 'cors';
import {
    createUser,
    loginUser,
    authenticateToken,
    refreshToken,
    logout
} from './controller/user-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

const router = express.Router();

// Controller will contain all the User-defined Routes
// router.get('/', (_, res) => res.send('Hello World from user-service'));
router.get('/', authenticateToken);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/refreshToken', refreshToken);
router.delete('/logout', logout);

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8000, () => console.log('user-service listening on port 8000'));
