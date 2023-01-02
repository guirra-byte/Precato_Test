import { ISubRepository } from "../../../Repository/ISubRepository";

export class UpdateLastMessageUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute(id: string, last_message: number) {

    await this
      .subRepository
      .updateLastMessage(id, last_message);
  }
}