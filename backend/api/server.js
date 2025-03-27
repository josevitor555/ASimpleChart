// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Create a express app
import express from 'express';
const app = express();

// Import chart data
import chartData from './chart_data/chart_data.js';

// Configure the Middleware
import cors from 'cors';
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    }
));

// define a simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend API.' });
});

// Define a route to get chart data
app.get('/api/chart-data', (req, res) => {
    res.json(chartData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
