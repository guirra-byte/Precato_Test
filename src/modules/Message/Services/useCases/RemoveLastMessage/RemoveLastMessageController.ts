import { Request, Response } from 'express';
import { RemoveLastMessageUseCase } from './RemoveLastMessageUseCase';

export class RemoveLastMessageController {

  constructor(private removeLastMessageUseCase: RemoveLastMessageUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const removeLastMessage = await this
        .removeLastMessageUseCase
        .execute();

      return response
        .status(204)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}