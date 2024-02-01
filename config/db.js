import mongoose from 'mongoose';
import logger from '../logger.js';

const connectDB = async () => {
  logger.info('Connecting to MongoDB...'.cyan.underline.bold);
  logger.info(process.env.MONGO_URI);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
