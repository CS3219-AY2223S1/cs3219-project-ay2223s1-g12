import express from 'express';
import httpMatchController from '../controller/controller.js';

const router = express.Router();

router.get('/', httpMatchController.findAllPendingMatches);
router.get('/:username', httpMatchController.findPendingMatchByUsername);

export default router;
