import { Router } from 'express';
import Project from '../models/Project.js';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.js';
import advancedResults from '../middleware/advancedResults.js';

const projectsRouter = new Router();

projectsRouter
  .route('/')
  .post(createProject)
  .get(advancedResults(Project), getProjects);

projectsRouter
  .route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default projectsRouter;
