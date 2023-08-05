import { Router } from 'express';
import { createProject } from '../controllers/projects.js';

const projectsRouter = new Router();

projectsRouter.route('/').post(createProject);

export default projectsRouter;
