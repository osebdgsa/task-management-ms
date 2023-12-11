import express from 'express';
import {register, login, validateJWT} from '../controllers/authController';

const router = express.Router();

// POST /api/auth/register - User registration route
router.post('/register', register);

// POST /api/auth/login - User login route
router.post('/login', login);

// POST /api/auth/validate-token - Validate JWT token
router.post('/validate-token', validateJWT);

export default router;
