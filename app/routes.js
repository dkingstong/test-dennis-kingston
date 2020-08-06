import { Router } from 'express';
import documentRoutes from './routes/document.route';

const routes = Router();

routes.use('/document', documentRoutes);

module.exports = routes;
