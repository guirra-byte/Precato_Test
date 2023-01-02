import { Request, Response } from 'express';
import { SendMailUseCase } from './SendMailUseCase';

export class SendMailController {

  constructor(private sendMailUseCase: SendMailUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const sendMail = await this
        .sendMailUseCase
        .execute();

      return response
        .status(200)
        .send()
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception} --- Erro está aqui` });
    }
  }
}