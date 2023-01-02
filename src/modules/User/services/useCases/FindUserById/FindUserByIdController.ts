import { Request, Response } from 'express';
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

export class FindUserByIdController {

  constructor(private findUserByIdUseCase: FindUserByIdUseCase) { }

  async handle(request: Request, response: Response) {

    const { sub } = request.body;

    try {

      const findUserById = await this
        .findUserByIdUseCase
        .execute(sub);

      return response
        .status(200)
        .json({ findUserById });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}