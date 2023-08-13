import { upload, bufferToDataUri } from '../middleware/multer.js';
import uploader from '../services/cloudinary.js';
import ErrorResponse from '../services/errorResponse.js';
import asyncHandler from '../middleware/async.js';

const uploadImage = asyncHandler(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new ErrorResponse(err.message, 400));
    }
    if (!req.file) {
      return next(new ErrorResponse('Please upload an image', 400));
    }
    const { mimetype, buffer } = req.file;
    const fileFormat = mimetype.split('/')[1];
    const fileData = bufferToDataUri(`.${fileFormat}`, buffer).content;

    const imageUrl = await uploader(fileData);
    if (!imageUrl) {
      return next(
        new ErrorResponse('Image upload to cloudinary failed', 500),
      );
    }

    req.imageUrl = imageUrl;
    next();
  });
});

export default uploadImage;
