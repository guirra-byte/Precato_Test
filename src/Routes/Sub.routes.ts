import { Router } from 'express';

import { findAllSubsController } from '../Modules/Sub/Services/useCases/FindAllSubs';
import { findOneSubController } from '../Modules/Sub/Services/useCases/FindOneSub';
import { updateActivePropsController } from '../Modules/Sub/Services/useCases/UpdateActiveProps';

const subRoutes = Router();

subRoutes.get('/', (request, response) => {

  return findOneSubController
    .handle(request, response);
});

subRoutes.get('/all', (request, response) => {

  return findAllSubsController
    .handle(request, response);
});

subRoutes.patch('/sub', (request, response) => {

  return updateActivePropsController
    .handle(request, response);
});

export { subRoutes }