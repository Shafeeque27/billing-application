// Description: Routes for user authentication using JWT.

import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
    console.log('Request body:', req.body);

    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_ID &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        return res.json({ token });
    } else {
        console.log('Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default router;
