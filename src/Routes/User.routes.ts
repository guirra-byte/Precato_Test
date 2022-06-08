import { Router } from 'express';

import { verifyEmailAlreadyExists } from '../Middleware/VerifyEmailAlreadyExists';
import { verifyUserAuthToken } from '../Middleware/Token/Auth/VerifyUserAuthToken'

import { createUserController } from '../Modules/User/services/useCases/CreateUser';
import { findAllUsersController } from '../Modules/User/services/useCases/FindAllUsers';
import { findOneUserController } from '../Modules/User/services/useCases/FindOneUser';

import { createUserAuthTokenController } from '../Modules/User/services/useCases/Token/Auth';

const userRoutes = Router();

userRoutes.post('/', verifyEmailAlreadyExists, (request, response) => {

  return createUserController
    .handle(request, response);
});

userRoutes.get('/', verifyUserAuthToken, (request, response) => {

  return findOneUserController
    .handle(request, response);
});

userRoutes.get('/all', (request, response) => {

  return findAllUsersController
    .handle(request, response);
});

userRoutes.post('/token', (request, response) => {

  return createUserAuthTokenController
    .handle(request, response);
})

export { userRoutes }