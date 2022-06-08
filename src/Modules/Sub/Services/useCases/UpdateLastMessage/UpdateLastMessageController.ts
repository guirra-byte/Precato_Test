import { Request, Response } from 'express';
import { UpdateLastMessageUseCase } from './UpdateLastMessageUseCase';

export class UpdateLastMessageController {

  constructor(private updateLastMessageUseCase: UpdateLastMessageUseCase) { }

  async handle(request: Request, response: Response) {

    const { id, last_message } = request.body;

    try {

      const updateLastMessage = await
        this
          .updateLastMessageUseCase
          .execute(id, last_message);

      return response
        .status(200)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}