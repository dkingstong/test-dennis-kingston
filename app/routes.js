import { Router } from 'express';
import documentRoutes from './routes/document.route';
import userRoutes from './routes/user.route';

const routes = Router();

routes.use('/document', documentRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
