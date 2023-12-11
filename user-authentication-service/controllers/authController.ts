import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user data (ideally, you'd connect this to a database)
const users: { [key: string]: any } = {};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        if (users[username]) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data (here, just in memory, should be saved in a database)
        users[username] = { username, password: hashedPassword };

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = users[username];
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Create JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
