import { IMessageRepository } from '../../../../Message/Repository/IMessageRepository';

import { MessagesFlowUseCase } from '../../../../Message/Services/useCases/Messages/MessagesFlowUseCase';

export class SendMailUseCase {

  constructor(
    private messageRepository: IMessageRepository,
    private messagesFlow: MessagesFlowUseCase) { }

  async execute(): Promise<void> {

    const message = await this
      .messagesFlow
      .execute();
  }
}