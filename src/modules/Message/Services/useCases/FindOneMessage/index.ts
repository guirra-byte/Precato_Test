import { MessageRepository } from "../../../Repository/Implementation/MessageRepository";
import { FindOneMessageUseCase } from "./FindOneMessageUseCase";
import { FindOneMessageController } from "./FindOneMessageController";

const messageRepository = MessageRepository.getInstance();

const findOneMessageUseCase = new FindOneMessageUseCase(messageRepository);

const findOneMessageController = new FindOneMessageController(findOneMessageUseCase);

export { findOneMessageController }