import { config } from 'dotenv';
import ErrorResponse from '../services/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Project from '../models/Project.js';
import { upload, bufferToDataUri } from '../middleware/multer.js';
import uploader from '../services/cloudinary.js';

config({ path: './config/config.env' });

// @desc: Add a new project
// @route: POST /api/v1/projects
export const createProject = asyncHandler(async (req, res, next) => {
  // Use multer middleware to upload image
  upload(req, res, async (err) => {
    if (err) {
      return next(new ErrorResponse(err.message, 400));
    }
    if (!req.file) {
      return next(new ErrorResponse('Please upload an image', 400));
    }

    // Convert the uploaded image to data uri using bufferToDataUri function
    const { mimetype, buffer } = req.file;
    const fileFormat = mimetype.split('/')[1];
    const fileData = bufferToDataUri(`.${fileFormat}`, buffer).content;

    // Upload the image to cloudinary using uploader function
    const imageUrl = await uploader(fileData);
    if (!imageUrl) {
      return next(new ErrorResponse('Image upload to cloudinary failed', 500));
    }

    // Create a new project with the cloudinary uploaded image url
    try {
      const project = await Project.create({ image: imageUrl, ...req.body });
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  });
});
