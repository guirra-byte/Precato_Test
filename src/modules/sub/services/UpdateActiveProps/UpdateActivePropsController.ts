import { Request, Response } from 'express';
import { UpdateActivePropsUseCase } from './UpdateActivePropsUseCase';

export class UpdateActivePropsController {

  constructor(private updateActivePropsUseCase: UpdateActivePropsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.body;

    try {

      const updateActiveProps = await
        this
          .updateActivePropsUseCase
          .execute(id);

      return response
        .status(200)
        .json({ updateActiveProps });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: `${exception}` });
    }
  }
}