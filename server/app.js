import express from 'express';
import { PORT } from './config/env.js'
const app = express();

app.use(express.json());
app.listen(PORT, () => console.log("Running on port : ", PORT));