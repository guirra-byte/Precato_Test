import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import { UserRepository } from '../../../Modules/User/repository/implementation/UserRepository';
import { hashTokenPass } from '../../../Modules/User/services/useCases/Token/Auth/CreateUserAuthTokenUseCase';

export interface IRequestTokenPayloadProps {

  name: string,
  email: string,
  sub: string
}

const verifyUserAuthToken = async (request: Request, response: Response, next: NextFunction) => {

  const bearerToken = request.headers.authorization;

  if (bearerToken === undefined) {

    throw new Error("Token is missing!");
  }

  const token = bearerToken.split(" ");
  const authToken = token[1];

  try {

    const verifyAuthToken = verify(authToken, hashTokenPass) as IRequestTokenPayloadProps;

    const userRepository = UserRepository.getInstance();

    const findUserId = await userRepository
      .findById(verifyAuthToken.sub);

    if (findUserId === undefined || findUserId.id === undefined) {

      throw new Error("User does exists");
    }

    const { id } = findUserId;

    request
      .user = { id: id }

    next();
  }
  catch {

    return response
      .status(400)
      .json({ message: "Token are invalid" });
  }
}

export { verifyUserAuthToken }