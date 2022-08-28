import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
    // console.log('hello from port 8001')
});

io.on('connection', () => {
    console.log('connected');
});

httpServer.listen(8001, () => {
    console.log('listening at port 8001');
});
