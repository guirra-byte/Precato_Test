import { Request, Response } from 'express';
import { FindAllMessagesUseCase } from './FindAllMessagesUseCase';

export class FindAllMessagesController {

  constructor(private findAllMessagesUseCase: FindAllMessagesUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    try {

      const findAllMessages = await this
        .findAllMessagesUseCase
        .execute();

      return response
        .status(200)
        .json({ findAllMessages });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}