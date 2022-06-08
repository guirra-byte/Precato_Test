import { Router } from 'express';

import { verifyEmailAlreadyExists } from '../Middleware/VerifyEmailAlreadyExists';

import { createUserController } from '../Modules/User/services/useCases/CreateUser';
import { findAllUsersController } from '../Modules/User/services/useCases/FindAllUsers';
import { findOneUserController } from '../Modules/User/services/useCases/FindOneUser';

const userRoutes = Router();

userRoutes.post('/', verifyEmailAlreadyExists, (request, response) => {

  return createUserController
    .handle(request, response);
});

userRoutes.get('/', (request, response) => {

  return findOneUserController
    .handle(request, response);
});

userRoutes.get('/users', (request, response) => {

  return findAllUsersController
    .handle(request, response);
});

export { userRoutes }