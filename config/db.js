import mongoose from 'mongoose';
import logger from '../logger.js';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
