import express from 'express';
import Providers from '../models/provider.js';

const router = express.Router();

router.post('/providers', (req, res) => {
    const provider = Providers(req.body);
    provider
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.get('/providers', (req, res) => {
    Providers
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.get('providers/:id', (req, res) => {
    const { id } = req.params;
    Providers
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.delete('/providers/:id', (req, res) => {
    const { id } = req.params;
    Providers
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put('/providers/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, phone, managerName } = req.body;
    Providers
        .updateOne({ _id: id }, { $set: { name, address, phone, managerName } })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

export default router;