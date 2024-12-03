import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
import tenantRoutes from './routes/tenantRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app: Application = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Example root route
app.use('/api/v1', tenantRoutes);
app.use('/api/v1', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error('Error:', err.message);
  res
    .status(500)
    .json({ message: 'Internal Server Error', error: err.message });
});

// Connect to MongoDB
const startServer = async (): Promise<void> => {
  const dbUri = process.env.MONGO_URI || '';
  await connectToDatabase(dbUri);
};

startServer();

export default app;
