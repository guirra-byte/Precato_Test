import { Request, Response } from 'express';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

export class FindAllUsersController {

  constructor(private findAllUsersUseCase: FindAllUsersUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const findAllUsers = await this
        .findAllUsersUseCase
        .execute();

      return response
        .status(200)
        .json({ findAllUsers });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ exception });
    }
  }
}