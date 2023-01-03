import { ISubRepository } from "../../../repositories/ISubRepository";
import { ISubAllPropsRequestDTO } from "../../../repositories/ISubRepository";

export class FindAllSubsUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute(): Promise<ISubAllPropsRequestDTO[]> {

    const findAllSubs = await this
      .subRepository
      .findAll();

    return findAllSubs;
  }
}