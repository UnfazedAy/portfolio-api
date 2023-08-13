import ErrorResponse from '../services/errorResponse.js';
import Project from '../models/Project.js';

const updateProjectData = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // If req.imageUrl exists, add it to the updateData
    if (req.imageUrl) {
      updateData.image = req.imageUrl;
    }

    // Find the project by ID and update it
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated project
      runValidators: true, // Validate the updated data
    });

    if (!project) {
      return next(
        new ErrorResponse(`Project not found with id ${req.params.id}`, 404),
      );
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    next(error);
  }
};

export default updateProjectData;
