import app from './app.js';
import {connectDB} from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 2000;

//connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect database. Server not started.', err);
    process.exit(1);
  });

