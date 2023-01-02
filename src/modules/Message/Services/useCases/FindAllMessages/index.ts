import { MessageRepository } from "../../../Repository/Implementation/MessageRepository";
import { FindAllMessagesUseCase } from "./FindAllMessagesUseCase";
import { FindAllMessagesController } from "./FindAllMessagesController";

const messageRepository = MessageRepository.getInstance();

const findAllMessagesUseCase = new FindAllMessagesUseCase(messageRepository);

const findAllMessagesController = new FindAllMessagesController(findAllMessagesUseCase);

export { findAllMessagesController }