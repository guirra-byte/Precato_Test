import { Request, Response } from 'express';
import { CreateSubUseCase } from './CreateSubUseCase';

export class CreateSubController {

  constructor(private createSubUseCase: CreateSubUseCase) { }

  async handle(request: Request, response: Response) {

    const { name } = request.body;

    try {

      const createSub = await this
        .createSubUseCase
        .execute({ name });

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