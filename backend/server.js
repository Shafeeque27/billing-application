// Entry point of the backend application. Sets up the Express server,
// connects to the database, and defines routes and middleware.
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB(); // Connecting to the database
const app = express(); // Creating an instance of an Express application

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => res.send('MERN Billing Api is running...')); // Basic route to check if the server is running

app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Setting the port for the server to listen on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
