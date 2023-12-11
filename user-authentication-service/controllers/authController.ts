import { Request, Response } from 'express';
import {loginUser, registerUser, validateToken} from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const registered = await registerUser(username, password);

        if (registered) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(username, password);

        if (token) {
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const validateJWT = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        const validationResult = await validateToken(token);

        res.status(200).json({ valid: validationResult });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

