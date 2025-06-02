import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './db/db';
import providerRoutes from './routes/Provider.route';
import productRoutes from './routes/Product.route';

dotenv.config();

// Connect to MongoDB before starting the server
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Routes
app.use('/api/providers', providerRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});