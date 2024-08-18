import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import chainRoutes from './routes/chainRoutes';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/chain', chainRoutes);

app.use(notFoundMiddleware);

export default app;
