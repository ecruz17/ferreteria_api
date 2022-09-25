import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsRoutes from './src/routes/product.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

const envVar = dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MIDDLEWARE
app.use('/api', productsRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

//MONGOOSE
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Listening`));
