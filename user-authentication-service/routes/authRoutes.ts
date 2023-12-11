import express, { Request, Response } from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/register - User registration route
router.post('/register', async (req: Request, res: Response) => {
    try {
        await register(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /api/auth/login - User login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
