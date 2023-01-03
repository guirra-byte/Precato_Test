import { AppError } from "../../../../../shared/errors/AppError";
import { IMessageRepository } from "../../../Repository/IMessageRepository";

export class FindOneMessageUseCase {

  constructor(private messageRepository: IMessageRepository) { }

  async execute(template_name: string) {

    const findUniqueMessage = await this
      .messageRepository
      .findOne(template_name);

    if (findUniqueMessage === undefined) {

      throw new AppError("Message does exists");
    }

    return findUniqueMessage;
  }

}