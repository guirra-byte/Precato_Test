import { Request, Response } from 'express';
import { FindOneSubUseCase } from './FindOneSubUseCase';

export class FindOneSubController {

  constructor(private findOneSubUseCase: FindOneSubUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { name } = request.params;

    try {

      const findOneSub = await this
        .findOneSubUseCase
        .execute(name);

      return response
        .status(200)
        .json({ findOneSub });
    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}