import { ISubRepository } from "../../../Repository/ISubRepository";

export class UpdateActivePropsUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute(id: string) {

    await this
      .subRepository
      .updateActiveProps(id);
  }
}