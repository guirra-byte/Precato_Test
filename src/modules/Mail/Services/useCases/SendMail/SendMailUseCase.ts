import { MessagesFlowUseCase } from '../../../../Message/Services/useCases/Messages/MessagesFlowUseCase';

export class SendMailUseCase {
  constructor(private messagesFlow: MessagesFlowUseCase) { }

  async execute(to: string[]): Promise<void> {
      await this
        .messagesFlow
        .execute(to);
  }
}