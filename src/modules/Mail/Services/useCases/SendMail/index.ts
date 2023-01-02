import { MessageRepository } from "../../../../Message/Repository/Implementation/MessageRepository";
import { SubRepository } from "../../../../Sub/Repository/Implementation/SubRepository";

import { MessagesFlowUseCase } from "../../../../Message/Services/useCases/Messages/MessagesFlowUseCase";
import { MailModelUseCase } from "../MailModelUseCase/MailModelUseCase";
import { transport } from "../../../Config/Mail.config";

import { SendMailUseCase } from "./SendMailUseCase";
import { SendMailController } from "./SendMailController";

const messageRepository = MessageRepository.getInstance();

const subRepository = SubRepository.getInstance();

const mailModelUseCase = new MailModelUseCase(transport);

const messagesFlow = new MessagesFlowUseCase(mailModelUseCase, messageRepository, subRepository);

const sendMailUseCase = new SendMailUseCase(messageRepository, messagesFlow);

const sendMailController = new SendMailController(sendMailUseCase);

export { sendMailController }