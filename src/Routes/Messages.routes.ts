import { Router } from 'express';

import { verifyMessageTemplateNameAlreadyExists } from '../Middleware/VerifyMessageTemplateNameAlreadyExists';

import { createMessageController } from '../Modules/Message/Services/useCases/CreateMessage';
import { findAllMessagesController } from '../Modules/Message/Services/useCases/FindAllMessages';
import { findOneMessageController } from '../Modules/Message/Services/useCases/FindOneMessage';
import { removeLastMessageController } from '../Modules/Message/Services/useCases/RemoveLastMessage';
import { sendMailController } from '../Modules/Mail/Services/useCases/SendMail';

//Instanciação do Router;
const messagesRoutes = Router();

//---- Route de criação de Message ----
messagesRoutes.post("/", verifyMessageTemplateNameAlreadyExists, (request, response) => {

  return createMessageController
    .handle(request, response);
});
// ---- ** ----

// ---- Route que retorna UMA Message ----
messagesRoutes.get('/:template_name', (request, response) => {

  return findOneMessageController
    .handle(request, response);
});
// ---- ** ----

// ---- Route que retorna TODAS as Messages ---- 
messagesRoutes.get('/all', (request, response) => {

  return findAllMessagesController
    .handle(request, response);
});
// ---- ** ----

// ---- Route de remoção da ÚLTIMA Message ----
messagesRoutes.delete('/removeLastMessage', (request, response) => {

  return removeLastMessageController
    .handle(request, response);
});
// ---- ** ----

// ---- Route de INSTANCIAÇÃO do Message Flow com envio de Emails em massa
messagesRoutes.post("/send", (request, response) => {

  return sendMailController
    .handle(request, response);
})
// ---- ** ----

export { messagesRoutes }