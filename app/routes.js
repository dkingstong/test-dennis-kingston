import { Router } from 'express';
import documentRoutes from './routes/document.route';
import userRoutes from './routes/user.route';
import versionedDocRoutes from './routes/versionedDoc.route';

const routes = Router();

routes.use('/document', documentRoutes);
routes.use('/user', userRoutes);
routes.use('/versioned-doc', versionedDocRoutes);

module.exports = routes;
