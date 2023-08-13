import { config } from 'dotenv';
// import ErrorResponse from '../services/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Project from '../models/Project.js';
import uploadImage from '../middleware/imageUpload.js';

config({ path: './config/config.env' });

// @desc: Add a new project
// @route: POST /api/v1/projects
export const createProject = asyncHandler(async (req, res, next) => {
  // Use imageUpload middleware to upload image
  uploadImage(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    try {
      const project = await Project.create({
        image: req.imageUrl, ...req.body,
      });
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      console.error('Error creating project:', error);
      next(error);
    }
  });
});

// @desc Get all projects
// @route GET ap1/v1/projects
export const getProjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
