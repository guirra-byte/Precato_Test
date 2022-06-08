import { ISubRepository } from "../../../Repository/ISubRepository";
import { ISubAllPropsRequestDTO } from "../../../Repository/ISubRepository";

export class FindAllSubsUseCase {

  constructor(private subRepository: ISubRepository) { }

  async execute(): Promise<ISubAllPropsRequestDTO[]> {

    const findAllSubs = await this
      .subRepository
      .findAll();

    return findAllSubs;
  }
}