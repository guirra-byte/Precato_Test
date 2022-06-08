import { IMessageAllPropsRequestDTO, IMessageRepository } from "../../../Repository/IMessageRepository";

export class FindAllMessagesUseCase {

  constructor(private messageRepository: IMessageRepository) { }

  async execute(): Promise<IMessageAllPropsRequestDTO[]> {

    const findAllMessages = await this
      .messageRepository
      .findAll();

    return findAllMessages;
  }
}