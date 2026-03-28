import express from 'express';
import auth_route from './src/routes/auth_route.js';
import { errorHandler } from './src/middlewares/error_handler.js';
import batch_route from './src/routes/batch_route.js';
import feed_route from './src/routes/feed_route.js';
import recommendation_route from './src/routes/recommendation_route.js';
import harvest_route from './src/routes/harvest_route.js';
import analytics_route from './src/routes/analytics_route.js';

const app = express();

//include json middleware
app.use(express.json());

//test router
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

//include routes
app.use('/api/auth', auth_route);
app.use('/api/batches', batch_route);
app.use('/api/feeds', feed_route);
app.use('/api/recommendations', recommendation_route);
app.use('/api/harvest', harvest_route);
app.use('/api/analytics', analytics_route);

// Global error handling middleware
app.use(errorHandler);






export default app;