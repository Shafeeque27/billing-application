// Middleware to protect routes and verify JWT tokens

import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token. Split and get the token part.
    if (!token) {
        return res
            .status(401)
            .json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user info to request object
        next();// Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
