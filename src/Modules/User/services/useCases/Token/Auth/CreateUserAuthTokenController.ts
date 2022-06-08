import { Request, Response } from 'express';
import { CreateUserAuthTokenUseCase } from './CreateUserAuthTokenUseCase';

export class CreateUserAuthTokenController {

  constructor(private createUserAuthTokenUseCase: CreateUserAuthTokenUseCase) { }

  async handle(request: Request, response: Response) {

    const { name, email } = request.body;

    try {

      const createUserAuthToken = await this
        .createUserAuthTokenUseCase
        .execute(name, email);

      return response
        .status(201)
        .json({ createUserAuthToken });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}