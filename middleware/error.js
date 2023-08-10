import ErrorResponse from '../services/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000 && err.keyValue) {
    const uniqueFields = Object.keys(err.keyValue);
    const messages = uniqueFields.map((field) => {
      const value = err.keyValue[field];
      return `Duplicate value '${value}' entered for feild '${field}'`;
    });
    const message = messages.join(', ');
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

export default errorHandler;
