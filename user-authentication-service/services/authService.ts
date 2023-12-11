import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Assuming you have a User model

export const registerUser = async (username: string, password: string): Promise<boolean> => {
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return false; // User already exists
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        return true; // User registered successfully
    } catch (error) {
        console.error('Error in registering user:', error);
        throw new Error('Registration failed');
    }
};

export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return null; // User not found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null; // Invalid credentials
        }

        return jwt.sign({username}, process.env.JWT_SECRET!, {expiresIn: '1h'}); // Login successful, return token
    } catch (error) {
        console.error('Error in user login:', error);
        throw new Error('Login failed');
    }
};

// authService.ts

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        // Validation logic for the token
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        if (decodedToken) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};