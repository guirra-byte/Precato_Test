import { Router } from 'express';

import { verifyEmailAlreadyExists } from '../Middleware/VerifyEmailAlreadyExists';
import { verifyUserAuthToken } from '../Middleware/Token/Auth/VerifyUserAuthToken'

import { createUserController } from '../Modules/User/services/useCases/CreateUser';
import { findAllUsersController } from '../Modules/User/services/useCases/FindAllUsers';
import { findOneUserController } from '../Modules/User/services/useCases/FindOneUser';

import { createUserAuthTokenController } from '../Modules/User/services/useCases/Token/Auth';

const userRoutes = Router();

// ---- Route de criação de User ----
//Ao criar um User, um Sub para este mesmo user é gerado;
userRoutes.post('/', verifyEmailAlreadyExists, (request, response) => {

  return createUserController
    .handle(request, response);
});
// ---- ** ----

// ---- Route que retorna apenas um User ---- 
//Para retornar apenas um User, nesta rota é requerido que seja gerado um Token de autenticação
userRoutes.get('/:email', verifyUserAuthToken, (request, response) => {

  return findOneUserController
    .handle(request, response);
});
// ---- ** ----

// ---- Route que retorna todos os Users existentes ----
//Para retornar todos os Users, nesta rota é requerido que seja gerado um Token de autenticação
userRoutes.get('/all', verifyUserAuthToken, (request, response) => {

  return findAllUsersController
    .handle(request, response);
});

// ---- Route para a criação de um Token de Autenticação ----
userRoutes.post('/token', (request, response) => {

  return createUserAuthTokenController
    .handle(request, response);
});
// ---- ** ----

export { userRoutes }