import { Request, Response } from 'express';
import { MessagesFlowUseCase } from './MessagesFlowUseCase';

export class MessagesFlowController {

  constructor(private messagesFlowUseCase: MessagesFlowUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    try {

      const initMessagesFlow = await this
        .messagesFlowUseCase
        .execute();

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