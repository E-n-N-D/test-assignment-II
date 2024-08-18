import express from 'express';
import { replyPost, getChainPosts } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/reply', authMiddleware, replyPost);
router.get('/:id', getChainPosts);

export default router;
