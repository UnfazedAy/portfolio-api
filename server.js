import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import connectDB from './config/db.js';

// Load env variables
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`.yellow.bold,
  ),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default server;
