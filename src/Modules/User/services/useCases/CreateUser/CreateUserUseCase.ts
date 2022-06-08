import { IUserRepository } from "../../../repository/IUserRepository";

export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(name: string, email: string): Promise<void> {

    const createUser = await this
      .userRepository
      .create({ name, email });

    return createUser;
  }
}