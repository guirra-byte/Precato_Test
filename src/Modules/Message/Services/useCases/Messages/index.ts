import { MessageRepository } from "../../../Repository/Implementation/MessageRepository";
import { SubRepository } from "../../../../Sub/Repository/Implementation/SubRepository";

import { prisma } from "../../../../../Prisma/Client/Client.prisma";

import { MessagesFlowUseCase } from "./MessagesFlowUseCase";
import { MessagesFlowController } from "./MessagesFlowController";

const messageRepository = MessageRepository.getInstance();

const subRepository = SubRepository.getInstance();

const messagesFlowUseCase = new MessagesFlowUseCase(prisma, messageRepository, subRepository);

const messagesFlowController = new MessagesFlowController(messagesFlowUseCase);

export { messagesFlowController }

