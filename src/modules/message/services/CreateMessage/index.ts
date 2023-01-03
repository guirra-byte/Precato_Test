import { MessageRepository } from "../../infra/prisma/repositories/implementations/MessageRepository";
import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { CreateMessageController } from "./CreateMessageController";

const messageRepository = MessageRepository.getInstance();

const createMessageUseCase = new CreateMessageUseCase(messageRepository);

const createMessageController = new CreateMessageController(createMessageUseCase);

export { createMessageController }