import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.use(express.json());

//GET ALL USERS
router.get('/users', (req, res) => {
    User
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//SIGNUP
router.post('/users', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ status: 400, message: 'Email and password are required' });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.send({ status: 409, message: 'Email already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return res.send({ status: 201, message: 'User created successfully' });
    } catch (err) {
        return res.send({ status: 500, message: 'Internal server error' });
    }
});

//DELETE USER
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User
        .deleteOne({ _id: id })
        .then((data) => res.send({ status: 202, message: 'User deleted succesfully' }))
        .catch((error) => res.json({ message: error }));
});

export default router;