import { Request, Response } from 'express';
import { CreateMessageUseCase } from "./CreateMessageUseCase";

export class CreateMessageController {

  constructor(private createMessageUseCase: CreateMessageUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { template_name } = request.body;

    try {

      const createMessage = await this
        .createMessageUseCase
        .execute(template_name);

      return response
        .status(201)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}