import { prisma } from "../Prisma/Client/Client.prisma";
import { Request, Response, NextFunction } from 'express';

//Middleware Para verificação de email;

const verifyEmailAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {

  const { email } = request.body;

  let repository: typeof prisma;
  repository = prisma;

  const findUserMail = await repository
    .users
    .findUnique({ where: { email: email } });

  if (findUserMail) {

    return response
      .status(400)
      .json({ message: `Email already in use` });
  }

  next();
}

export { verifyEmailAlreadyExists }