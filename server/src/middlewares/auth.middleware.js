
import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.decoded = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
