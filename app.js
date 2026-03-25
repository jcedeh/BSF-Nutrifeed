import express from 'express';
import auth_route from './src/routes/auth_route.js';
import { AppError } from './src/utils/AppError.js';
import { errorHandler } from './src/middlewares/error_handler.js';

const app = express();

//include json middleware
app.use(express.json());

//test router
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

//include routes
app.use('/api/auth', auth_route);

// Global error handling middleware
app.use(errorHandler);






export default app;