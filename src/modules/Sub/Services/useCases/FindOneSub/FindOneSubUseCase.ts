import { AppError } from "../../../../../shared/errors/AppError";
import { ISubAllPropsRequestDTO, ISubRepository, ISubRequestPropsDTO } from "../../../Repository/ISubRepository";

export class FindOneSubUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute(name: string): Promise<ISubAllPropsRequestDTO> {

    const findUniqueSub = await this
      .subRepository
      .findOne(name);

    if (findUniqueSub === undefined) {

      throw new AppError("This Sub does exists");
    }

    return findUniqueSub;
  }
}