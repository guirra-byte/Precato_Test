import { IMessageRepository } from "../../../Repository/IMessageRepository";

export class RemoveLastMessageUseCase {

  constructor(private messageRepository: IMessageRepository) { }

  async execute() {

    await this
      .messageRepository
      .removeLastMessage();
  }
}