// main route
import express from 'express';
import pendingMatchRoutes from './route/pendingMatchRoute.js';

const router = express.Router();

router.use('/pendingMatches', pendingMatchRoutes);

export default router;
