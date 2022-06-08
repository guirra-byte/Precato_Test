import { IMessageRepository } from "../../../Repository/IMessageRepository";

export class CreateMessageUseCase {

  constructor(private messageRepository: IMessageRepository) { }

  async execute(template_name: string): Promise<void> {

    await this
      .messageRepository
      .create({ template_name });
  }
}