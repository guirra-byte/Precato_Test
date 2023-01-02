import { prisma } from '../../prisma/Client/Client.prisma';
import { Request, Response, NextFunction } from 'express';

export const ensureUserIsAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const { adminMail } = request.body;

  const prismaClient = prisma;

  const user = await prismaClient
    .users
    .findUnique({ where: { email: adminMail } });

    if(!user){
      return response.status(404).json('User not is admin!');
    }

  next()
}