import express from 'express';
import bcrypt from 'bcrypt';
import Employee from '../models/employee.js';
import User from '../models/user.js';

const router = express.Router();

//GET ALL EMPLOYEES
router.get('/employees', (req, res) => {
    Employee
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//AUTH EMPLOYEE
router.post('/employees', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const newEmployee = new Employee({
            email: user.email,
            password: user.password,
            role: '2'
        });
        await newEmployee.save();
        res.status(201).send('Employee created')
    } catch (error) {
        res.send({ status: error });
    }
});


//LOGIN
router.post('/employees/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ status: 400, message: 'Email and password are required' });
        }
        const user = await Employee.findOne({ email: email });
        if (!user) {
            return res.send({ status: 404, message: 'Employee not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.send({ status: 401, message: 'Invalid password' });
        }
        if (user.role === '1') {
            return res.send({ status: 202, message: 'Admin account' });
        }
        return res.send({ status: 200, message: 'Login successful' });
    } catch (err) {
        console.log(err);
        return res.send({ status: 500, message: 'Internal server error' });
    }
});

//DELETE EMPLOYEE
router.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    Employee
        .deleteOne({ _id: id })
        .then((data) => res.send({ status: 202, message: 'User deleted succesfully' }))
        .catch((error) => res.json({ message: error }));
});

export default router;