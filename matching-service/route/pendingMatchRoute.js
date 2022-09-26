import express from 'express';
import httpMatchController from '../controller/controller.js';

const router = express.Router();

// router.post('/', httpMatchController.addPendingMatch);
router.post('/', httpMatchController.addPendingMatch);
// router.delete('/:username', httpMatchController.deleteByUsername);
// router.delete('/:id', httpMatchController.deleteById);
router.get('/', httpMatchController.findAllPendingMatches);
router.get('/:username', httpMatchController.findPendingMatchByUsername);
router.put('/:username', httpMatchController.updatePendingMatchDifficulty);

export default router;
