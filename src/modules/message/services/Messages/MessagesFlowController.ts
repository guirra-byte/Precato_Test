import { Request, Response } from 'express';
import { MessagesFlowUseCase } from './MessagesFlowUseCase';

export class MessagesFlowController {

  constructor(private messagesFlowUseCase: MessagesFlowUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { email } = request.user;

    try {

      const initMessagesFlow = await this
        .messagesFlowUseCase
        .execute(email);

      return response
        .status(200)
        .send()
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}