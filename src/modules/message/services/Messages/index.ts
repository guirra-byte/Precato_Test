import { MessageRepository } from "../../../Repository/Implementation/MessageRepository";
import { SubRepository } from "../../../../sub/infra/prisma/repositories/SubRepository";

import { prisma } from "../../../../../shared/prisma/Client/Client.prisma";

import { MessagesFlowUseCase } from "./MessagesFlowUseCase";
import { MessagesFlowController } from "./MessagesFlowController";

const messageRepository = MessageRepository.getInstance();

const subRepository = SubRepository.getInstance();

const messagesFlowUseCase = new MessagesFlowUseCase(prisma, messageRepository, subRepository);

const messagesFlowController = new MessagesFlowController(messagesFlowUseCase);

export { messagesFlowController }

