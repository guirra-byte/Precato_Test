import { Request, Response } from 'express';
import { CreateMessageUseCase } from "./CreateMessageUseCase";

export class CreateMessageController {

  constructor(private createMessageUseCase: CreateMessageUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { template_name, expect_send_date } = request.body;

    try {

      const createMessage = await this
        .createMessageUseCase
        .execute(template_name, expect_send_date);

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