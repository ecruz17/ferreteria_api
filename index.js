import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import productsRoutes from './src/routes/products.js';
import providersRoutes from './src/routes/providers.js';
import userRoutes from './src/routes/users.js';
import employeesRoutes from './src/routes/employees.js';

const app = express();
const PORT = process.env.PORT || 5000;

const envVar = dotenv.config();

app.use(cors());

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MIDDLEWARE
app.use('/api', productsRoutes);
app.use('/api', providersRoutes);
app.use('/api', userRoutes);
app.use('/api', employeesRoutes);

//MAIN ROUTE
app.get('/api', (req, res) => {
    res.send('<h1>La Ferretería API</h1>');
});

//MONGOOSE
mongoose
    .connect(process.env.MONGODB_URI, {
        writeConcern: {
            w: 'majority',
            j: true,
        }
    })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Listening`));
