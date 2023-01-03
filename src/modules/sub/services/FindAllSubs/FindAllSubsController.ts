import { Request, Response } from 'express';
import { FindAllSubsUseCase } from './FindAllSubsUseCase';

export class FindAllSubsController {

  constructor(private findAllSubsUseCase: FindAllSubsUseCase) { }

  async handle(request: Request, response: Response) {

    try {

      const findAllSubs = await this
        .findAllSubsUseCase
        .execute();

      return response
        .status(200)
        .json({ findAllSubs });
    }
    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}