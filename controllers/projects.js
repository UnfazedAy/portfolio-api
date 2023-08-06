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
      // console.log('Printing req.file');
      // console.log();
      // console.log(req.file);

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: 'No file uploaded' });
      }

      // Convert the uploaded image to data uri using bufferToDataUri function
      const { mimetype, buffer } = req.file;
      // console.log('Printing mimetype and buffer');
      // console.log();
      // console.log(mimetype, buffer);

      const dataUri = bufferToDataUri(mimetype, buffer).content;
      console.log('Printing dataUri');
      console.log();
      console.log(dataUri);

      // Upload the image to cloudinary using uploader function
      const imageUrl = await uploader(dataUri);

      // Create a new project with the cloudinary uploaded image url
      const project = await Project.create({ image: imageUrl, ...req.body });

      res.status(201).json({ success: true, data: project });
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
