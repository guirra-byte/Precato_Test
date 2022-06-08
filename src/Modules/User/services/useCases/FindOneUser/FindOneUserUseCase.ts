import { IFindUserRequestProps, IUserRepository } from "../../../repository/IUserRepository";

export class FindOneUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(email: string): Promise<IFindUserRequestProps | undefined> {

    const findUniqueUser = await this
      .userRepository
      .findOne(email);

    if (findUniqueUser === null) {

      throw new Error("This user does exists");
    }

    return findUniqueUser;
  }
}