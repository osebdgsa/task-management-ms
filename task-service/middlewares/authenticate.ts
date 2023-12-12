import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface ValidateTokenResponse {
    valid: boolean;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.method === 'OPTIONS') {
        next();
        return;
    }

    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized - Missing token' });
        return;
    }

    try {
        const response: AxiosResponse<ValidateTokenResponse> = await axios.post<ValidateTokenResponse>(
            'http://user-authentication-service:3001/api/auth/validate-token',
            {
                token,
            }
        );

        if (response.data.valid) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
