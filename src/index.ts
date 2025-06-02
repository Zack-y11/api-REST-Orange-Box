import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import connectDB from './db/db';
import providerRoutes from './routes/Provider.route';
import productRoutes from './routes/Product.route';
import { specs } from './docs/swagger';

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
    res.send('Welcome to the Orange Box API - Check out our documentation at /api-docs');
});

// Routes
app.use('/api/v1/providers', providerRoutes);
app.use('/api/v1/products', productRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Orange Box API Documentation',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true
    }
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});