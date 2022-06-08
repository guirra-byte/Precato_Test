import { Router } from 'express';

import { verifyMessageTemplateNameAlreadyExists } from '../Middleware/VerifyMessageTemplateNameAlreadyExists';
import { createMessageController } from '../Modules/Message/Services/useCases/CreateMessage';
import { findAllMessagesController } from '../Modules/Message/Services/useCases/FindAllMessages';
import { findOneMessageController } from '../Modules/Message/Services/useCases/FindOneMessage';
import { messagesFlowController } from '../Modules/Message/Services/useCases/Messages';
import { removeLastMessageController } from '../Modules/Message/Services/useCases/RemoveLastMessage';

const messagesRoutes = Router();

messagesRoutes.post("/", verifyMessageTemplateNameAlreadyExists, (request, response) => {

  return createMessageController
    .handle(request, response);
});

messagesRoutes.get('/', (request, response) => {

  return findOneMessageController
    .handle(request, response);
});

messagesRoutes.get('/messages', (request, response) => {

  return findAllMessagesController
    .handle(request, response);
});

messagesRoutes.delete('/removeLastMessage', (request, response) => {

  return removeLastMessageController
    .handle(request, response);
});

messagesRoutes.get('/messagesFlow', (request, response) => {

  return messagesFlowController
    .handle(request, response);
});

export { messagesRoutes }