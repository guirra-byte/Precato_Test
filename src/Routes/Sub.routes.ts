import { Router } from 'express';

import { findAllSubsController } from '../Modules/Sub/Services/useCases/FindAllSubs';
import { findOneSubController } from '../Modules/Sub/Services/useCases/FindOneSub';
import { updateActivePropsController } from '../Modules/Sub/Services/useCases/UpdateActiveProps';

const subRoutes = Router();

// ---- Route que retorna apenas um Sub ---- 
subRoutes.get('/:sub_id', (request, response) => {

  return findOneSubController
    .handle(request, response);
});
// ---- ** ----

// ---- Route que retorna todos os Subs ----
subRoutes.get('/all', (request, response) => {

  return findAllSubsController
    .handle(request, response);
});
// ---- ** ----

// ---- Route de atualização da propriedade Active dos Subs
subRoutes.put('/sub', (request, response) => {

  return updateActivePropsController
    .handle(request, response);
});
// ---- ** ----

export { subRoutes }