import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} from './env.js';

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT || 3306,
});

const connectToDatabase = async () => {
  try {
    await db.query('SELECT 1');
    console.log(' Connected to MySQL Database');
  } catch (error) {
    console.error('Error connecting to the Database: ', error.message);
    process.exit(1); 
  }
};
export default connectToDatabase;
