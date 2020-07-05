import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
// import ProviderController from './app/controllers/ProviderController';
import OrderController from './app/controllers/OrderController';

import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

// Auth
routes.post('/sessions', SessionController.store);

// Users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// Use middleware to authenticated routes
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// routes.get('/providers', ProviderController.index);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.delete('/orders/:id', OrderController.delete);

// routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
