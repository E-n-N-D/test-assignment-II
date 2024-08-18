import express from 'express';
import { getChains, createChain } from '../controllers/chainController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createChain);
router.get('/', getChains);

export default router;
