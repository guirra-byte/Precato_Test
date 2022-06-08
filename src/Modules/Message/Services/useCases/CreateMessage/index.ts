import { MessageRepository } from "../../../Repository/Implementation/MessageRepository";
import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { CreateMessageController } from "./CreateMessageController";

const messageRepository = MessageRepository.getInstance();

const createMessageUseCase = new CreateMessageUseCase(messageRepository);

const createMessageController = new CreateMessageController(createMessageUseCase);

export { createMessageController }