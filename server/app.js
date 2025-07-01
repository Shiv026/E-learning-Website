import express from 'express';
import { PORT } from './config/env.js'
import connectToDatabase from './config/db.js';
const app = express();

app.use(express.json());

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();