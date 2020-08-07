import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRoutes = Router({ mergeParams: true });

userRoutes.get('/', userController.index);
userRoutes.get('/:userId', userController.show);
userRoutes.put('/:userId', userController.update);
userRoutes.get('/:userId/my-documents', userController.getUserDocuments);
userRoutes.post('/', userController.create);

module.exports = userRoutes;
