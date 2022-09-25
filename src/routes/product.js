import express, { json, response } from 'express';
import Product from '../models/product.js';

const router = express.Router();

//CREATE PRODUCT
router.post('/products', (req, res) => {
    const product = Product(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//GET ALL PRODUCTS
router.get('/products', (req, res) => {
    Product
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//GET PRODUCT BY ID
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    Product
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//DELETE PRODUCT BY ID
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    Product
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//UPDATE PRODUCT BY ID
router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, provider, price, description } = req.body;
    Product
        .updateOne({ _id: id }, { $set: { name, provider, price, description } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

export default router;
