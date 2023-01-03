import { Request, Response } from 'express';
import { FindOneMessageUseCase } from './FindOneMessageUseCase';

export class FindOneMessageController {

  constructor(private findOneMessageUseCase: FindOneMessageUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { template_name } = request.params;

    try {

      const findMessage = await this
        .findOneMessageUseCase
        .execute(template_name);

      return response
        .status(200)
        .json({ findMessage });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}