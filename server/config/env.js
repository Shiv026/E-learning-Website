import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});


export const { PORT, NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;