import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

//LOGIN
router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.json('email exists');
        } else {
            res.json('email does not exist');
        }
    } catch (error) {
        res.json('an error occurred');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        const newUser = User({
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;