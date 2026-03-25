import express from 'express';
import auth_route from './src/routes/auth_route.js';
import { AppError } from './src/utils/AppError.js';

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
app.use((err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Handle AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle other errors
  return res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;