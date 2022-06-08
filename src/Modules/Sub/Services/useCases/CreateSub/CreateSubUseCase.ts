import { ISubRepository } from "../../../Repository/ISubRepository";
import { ISubRequestPropsDTO } from "../../../Repository/ISubRepository";

export class CreateSubUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute({ name }: ISubRequestPropsDTO): Promise<void> {

    await this
      .subRepository
      .create({ name });
  }
}