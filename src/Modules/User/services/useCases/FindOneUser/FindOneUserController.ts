import { Request, Response } from 'express';
import { FindOneUserUseCase } from './FindOneUserUseCase';

export class FindOneUserController {

  constructor(private findOneUserUseCase: FindOneUserUseCase) { }

  async handle(request: Request, response: Response) {

    const { email } = request.params;

    try {

      const findUniqueUser = await this
        .findOneUserUseCase
        .execute(email);

      return response
        .status(201)
        .json({ findUniqueUser });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}