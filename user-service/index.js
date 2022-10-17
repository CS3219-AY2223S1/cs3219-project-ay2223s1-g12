import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
    createUser,
    deleteUser,
    loginUser,
    logout,
    authenticateCookieToken,
    changePassword,
} from './controller/user-controller.js';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors()); // config cors so that front-end can use
app.use(cors({ origin: true, credentials: true })); // For cookie
app.options('*', cors());

const router = express.Router();

// Controller will contain all the User-defined Routes
// router.get('/', (_, res) => res.send('Hello World from user-service'));
router.post('/', createUser);
router.post('/deleteAccount', authenticateCookieToken, deleteUser, logout);
router.post('/changePassword', authenticateCookieToken, changePassword);
router.post('/login', loginUser);
router.post('/logout', authenticateCookieToken, logout);

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8000, () => console.log('user-service listening on port 8000'));
