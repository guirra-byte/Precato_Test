import { AppError } from '../../../../../shared/errors/AppError';
import { IUserRepository } from '../../../infra/prisma/repository/IUserRepository';

export class FindUserByIdUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(sub: string) {

    const findUserById = await this
      .userRepository
      .findById(sub);

    if (findUserById === undefined) {

      throw new AppError("This user does exists");
    }

    return findUserById;
  }
}