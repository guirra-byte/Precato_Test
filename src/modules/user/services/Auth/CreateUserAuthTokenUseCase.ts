import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../../../shared/errors/AppError';
import { IUserRepository } from '../../../../infra/prisma/repository/IUserRepository';

export const hashTokenPass: string = "8983caceda8e2878aa12fecce245509b";

export interface ITokenReturnProps {

  token: string,
  user: {

    name: string,
    email: string
    id?: string
  }
}

export class CreateUserAuthTokenUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(name: string, email: string): Promise<ITokenReturnProps> {

    const verifyEmailAlreadyExists = await this
      .userRepository
      .findOne(email);

    if (!verifyEmailAlreadyExists) {

      throw new AppError("Name or Email are incorrect");
    }

    const verifyName = verifyEmailAlreadyExists
      .props
      .name;

    if (verifyName !== name) {

      throw new AppError("Name or Email are incorrect");
    }

    const { id, props } = verifyEmailAlreadyExists;

    const token = sign({}, hashTokenPass, {

      subject: id,
      expiresIn: "1d"
    });

    const returnTokenProps: ITokenReturnProps = {

      token: token,
      user: {

        name: props.name,
        email: props.email,
        id: id
      }
    }

    return returnTokenProps;
  }
}