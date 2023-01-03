import { ISubRepository } from "../../infra/prisma/repositories/ISubRepository";
import { ISubRequestPropsDTO } from "../../infra/prisma/repositories/ISubRepository";

export class CreateSubUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute({ name }: ISubRequestPropsDTO): Promise<void> {

    await this
      .subRepository
      .create({ name });
  }
}