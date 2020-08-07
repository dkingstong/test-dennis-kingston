import { Router } from 'express';
import documentController from '../controllers/document.controller';

const documentRoutes = Router({ mergeParams: true });

documentRoutes.get('/', documentController.index);
documentRoutes.get('/:documentId', documentController.show);
documentRoutes.put('/:documentId', documentController.update);
documentRoutes.get('/share/:userId', documentController.share);
documentRoutes.post('/create/:userId', documentController.create);

module.exports = documentRoutes;
