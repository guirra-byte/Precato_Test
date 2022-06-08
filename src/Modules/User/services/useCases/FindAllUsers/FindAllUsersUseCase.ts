import { IFindUserRequestProps, IUserRepository } from "../../../repository/IUserRepository";

export class FindAllUsersUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(): Promise<IFindUserRequestProps[]> {

    const findAllUsers = await this
      .userRepository
      .findAll();

    return findAllUsers;
  }
}