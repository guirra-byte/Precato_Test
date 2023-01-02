import { MessageRepository } from '../../../Repository/Implementation/MessageRepository';
import { RemoveLastMessageUseCase } from './RemoveLastMessageUseCase';
import { RemoveLastMessageController } from './RemoveLastMessageController';

const messageRepository = MessageRepository.getInstance();

const removeLastMessageUseCase = new RemoveLastMessageUseCase(messageRepository);

const removeLastMessageController = new RemoveLastMessageController(removeLastMessageUseCase);

export { removeLastMessageController }