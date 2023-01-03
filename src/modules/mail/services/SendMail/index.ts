import { MessageRepository } from "../../../../message/infra/prisma/repositories/implementations/MessageRepository";
import { SubRepository } from "../../../../sub/infra/prisma/repositories/implementations/SubRepository";

import { MessagesFlowUseCase } from "../../../../message/services/useCases/Messages/MessagesFlowUseCase";
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