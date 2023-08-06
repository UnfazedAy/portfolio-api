import { config } from 'dotenv';
import Project from '../models/Project.js';
import { upload, bufferToDataUri } from '../middleware/multer.js';
import uploader from '../services/cloudinary.js';

config({ path: './config/config.env' });

// @desc: Add a new project
// @route: POST /api/v1/projects
// @access: Private
export const createProject = async (req, res, next) => {
  try {
    // Use multer middleware to upload image
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: 'No file uploaded' });
      }

      // Convert the uploaded image to data uri using bufferToDataUri function
      const { mimetype, buffer } = req.file;
      const fileFormat = mimetype.split('/')[1];

      const fileData = bufferToDataUri(`.${fileFormat}`, buffer).content;

      // Upload the image to cloudinary using uploader function
      const imageUrl = await uploader(fileData);

      if (!imageUrl) {
        return res
          .status(400)
          .json({ success: false, error: 'Image upload to cloudinary failed' });
      }

      // Create a new project with the cloudinary uploaded image url
      const project = await Project.create({ image: imageUrl, ...req.body });

      res.status(201).json({ success: true, data: project });
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
