import { Router } from 'express';
import versionedDocController from '../controllers/versionedDoc.controller';

const versionedDocRoutes = Router({ mergeParams: true });

versionedDocRoutes.get('/', versionedDocController.index);

module.exports = versionedDocRoutes;
